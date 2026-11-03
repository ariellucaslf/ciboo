# Decisões de Engenharia (Architecture Decision Records)

Este documento reúne as principais decisões técnicas tomadas no desenvolvimento do **Ciboo (`suavitrines-api` & `suavitrines-web`)** para resolver problemas reais de concorrência, consistência financeira, resiliência de integrações e escalabilidade operacional em restaurantes.

---

## ADR-01: Aritmética Monetária Estrita em Centavos (Integer Money)

### Contexto
Operações gastronômicas envolvem múltiplos itens, complementos fracionados, descontos percentuais ou fixos de cupons, pontos de fidelidade, taxas de entrega e divisão de pagamentos. O uso de números de ponto flutuante (`float` / `number` decimal padrão IEEE 754) em JavaScript pode gerar divergências como `0.1 + 0.2 = 0.30000000000000004`, causando falhas em conciliações de caixa e rejeições em gateways de pagamento (PSP).

### Decisão
- Implementar um módulo monetário dedicado (`src/modules/ordering/money.ts`) que converte e opera valores financeiros estritamente como **inteiros representando centavos** (`1990` = `R$ 19,90`).
- Persistir snapshots financeiros detalhados em centavos no momento exato da compra (`subtotalCents`, `discountCents`, `deliveryFeeCents`, `totalCents`), garantindo que alterações futuras no preço de um produto no cardápio jamais alterem o histórico contábil de pedidos passados.

---

## ADR-02: Motor de Idempotência com Serialização JSON Canônica

### Contexto
Clientes realizando pedidos pelo celular em redes 4G instáveis ou garçons enviando comandas no salão frequentemente sofrem timeouts de rede e reenviam a mesma requisição. Sem proteção de idempotência, isso resulta em pedidos duplicados na cozinha, cobranças em dobro no cartão/PIX ou baixas duplicadas no estoque.

### Decisão
- Exigir/suportar o cabeçalho `Idempotency-Key` em mutações críticas (criação de pedidos, transações de pagamento, movimentações de estoque e lançamentos de caixa).
- Como a ordem das chaves em um objeto JSON pode variar entre clientes, implementamos um **Serializador JSON Canônico** (`src/modules/idempotency/canonicalJson.ts`) que ordena recursivamente as propriedades antes de calcular o hash `SHA-256` do payload.
- **Comportamento**:
  - Se a mesma `Idempotency-Key` chegar com o **mesmo hash de payload**, a API retorna imediatamente o status e o corpo da resposta original armazenada, sem reexecutar a regra de negócio.
  - Se a mesma `Idempotency-Key` for reutilizada com um **payload diferente**, a API rejeita a chamada com `409 Conflict`, prevenindo corrupção acidental de estado.

---

## ADR-03: Padrão Transactional Outbox / Inbox em PostgreSQL

### Contexto
Quando um pedido é confirmado ou despachado, o sistema precisa atualizar o banco de dados local e, simultaneamente, notificar sistemas externos (ex: avisar a API do iFood, disparar e-mail transacional ou acionar webhooks). Fazer chamadas HTTP externas *dentro* da transação do banco de dados aumenta a latência, retém conexões do pool e cria inconsistências caso o banco faça commit mas a chamada HTTP falhe (ou vice-versa).

### Decisão
- Adotar o padrão **Transactional Outbox** (`src/modules/outbox/outbox.service.ts`):
  1. Na mesma transação ACID que altera o pedido, o serviço insere um registro na tabela `OutboxEvent` com status `PENDING`.
  2. O processo dedicado `OutboxWorker` (`src/worker.ts`) faz polling eficiente com *lease locking* (`claimBatch`), processa o envio externo e marca o evento como `PROCESSED` (ou agenda retentativa com *exponential backoff* até o limite de tentativas, movendo para `DEAD_LETTER` se necessário).
- Para eventos recebidos de terceiros (webhooks do iFood e PSPs), utilizamos uma tabela **Inbox** com chave de deduplicação por `externalEventId`, garantindo processamento *at-most-once* mesmo quando o provedor externo envia o mesmo webhook repetidas vezes.

---

## ADR-04: Máquina de Estados Determinística para Pedidos

### Contexto
Um pedido passa por múltiplos atores (Cliente, Caixa, Cozinha, Garçom, Entregador, iFood). Permitir atualizações arbitrárias de status (ex.: mudar um pedido `CANCELLED` de volta para `DELIVERED`, ou pular de `PENDING` direto para `DELIVERED` sem passar pelo fluxo financeiro/estoque) gera inconsistências graves.

### Decisão
- Centralizar todas as transições na máquina de estados `src/modules/ordering/stateMachine.ts`.
- Definir explicitamente o grafo de transições válidas por tipo de operação (`DELIVERY`, `PICKUP`, `DINE_IN` / Mesa).
- Acoplar ganchos transacionais às mudanças de estado:
  - Transição para confirmação/preparo → Aciona reserva/baixa automática de insumos da ficha técnica no estoque e publica evento no KDS.
  - Transição para cancelamento → Executa estorno idempotente dos insumos reservados ao estoque e registra o motivo e o ator responsável na trilha de auditoria.

---

## ADR-05: Livro-Razão Imutável (Ledger) para Fidelidade e Estoque

### Contexto
Armazenar apenas um campo mutável `pointsBalance` no cadastro do cliente ou `currentStock` no insumo torna impossível auditar discrepâncias ou recuperar o saldo correto após falhas concorrentes.

### Decisão
- Tanto o **Programa de Fidelidade** (`src/modules/engagement/loyaltyLedger.service.ts`) quanto o **Controle de Estoque** (`src/modules/inventory/inventory.service.ts`) são baseados em um **Livro-Razão (Append-Only Ledger)**.
- Cada acúmulo, resgate, expiração de pontos, entrada de nota fiscal, baixa por ficha técnica ou ajuste de perda gera uma entrada imutável vinculada ao documento de origem (`orderId`, `actorId`, `idempotencyKey`), permitindo auditoria contábil completa a qualquer momento.

---

## ADR-06: Governança de Rollout com Feature Flags Hierárquicas

### Contexto
Em um ambiente SaaS contínuo, novos módulos de alta criticidade (como conciliação automática de PSP, controle de estoque por receita ou integração iFood bidirecional) precisam ser ativados gradualmente por loja (piloto/beta) e contar com um *kill-switch* instantâneo em caso de degradação de provedores externos.

### Decisão
- Implementar um motor de **Feature Flags** (`src/infra/observability/featureFlags.ts`) com resolução em dois níveis:
  1. **Kill-Switch Global via Ambiente**: Variáveis de ambiente permitem desligar globalmente uma integração.
  2. **Escopo por Tenant (Persistido no Banco)**: O Super Admin pode habilitar ou desabilitar módulos específicos individualmente para cada restaurante em tempo de execução, sem necessidade de redeploy.
