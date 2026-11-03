# Módulos do Produto & Jornadas Operacionais

O **Ciboo (SuaVitrines Food)** foi desenhado para cobrir 100% da jornada operacional e comercial de um restaurante moderno — do momento em que o cliente descobre o cardápio no celular até o fechamento do turno de caixa e análise do DRE pelo gestor.

---

## 1. Vitrine Digital Mobile-First & Checkout em 2 Etapas

A vitrine pública (`/[slug]`) foi construída com foco obsessivo em **taxa de conversão** e velocidade de carregamento:

- **Identidade Visual por Loja**: Cores da marca, logotipo, banner de capa, selo de status (Aberto/Fechado em tempo real conforme horário de funcionamento), tempo médio estimado de entrega/retirada e avaliações verificadas.
- **Navegação com Scrollspy e Busca Instantânea**: Barra de categorias fixa que acompanha a rolagem da página, seção de produtos em destaque (*Featured*) e modal/bottom-sheet de produto com seleção intuitiva de variações e grupos de complementos (mínimo/máximo obrigatórios).
- **Checkout Enxuto em 2 Etapas**:
  1. **Identificação e Modalidade**: Suporte nativo a **Delivery** (com cálculo automático de taxa por bairro), **Retirada no Balcão** e **Consumo no Local / Mesa via QR Code** (preenchimento automático do número da mesa via parâmetro `?table=`).
  2. **Pagamento e Confirmação**: PIX, Cartão, Dinheiro (com cálculo de troco), aplicação de cupons promocionais e resgate de pontos da carteira de fidelidade.
- **Live Order Tracker**: Página dedicada de acompanhamento do pedido ao vivo com barra de progresso em tempo real, resumo dos itens e PIN de segurança para recebimento da entrega.

---

## 2. Live Command Center (Central de Pedidos ao Vivo)

O coração da operação de balcão e expedição (`/admin/live`):

- **Visão Unificada Multicanal**: Recebe em uma única tela os pedidos vindos da Vitrine Digital própria, dos Garçons no salão, do QR Code das mesas e da integração **iFood**.
- **Alertas Sonoros e Monitoramento de SLA**: Destaque visual para novos pedidos pendentes de aceite e indicadores de tempo decorrido para evitar atrasos na expedição.
- **Ações Rápidas em 1 Clique**: Aceitar pedido, avançar para preparo, despachar com atribuição de entregador e imprimir comanda térmica (58mm/80mm).

---

## 3. KDS (Kitchen Display System) por Estações de Preparo

A tela de cozinha (`/admin/kitchen`) substitui comandas de papel perdidas por um fluxo digital sincronizado via **Server-Sent Events (SSE)**:

- **Roteamento por Praça/Estação**: Os itens de um mesmo pedido podem ser distribuídos automaticamente para suas respectivas estações (ex.: *Chapa/Cozinha Quente*, *Pizzaria/Forno*, *Bar/Bebidas*, *Sobremesas*).
- **Controle Granular por Item e por Pedido**: Os operadores da cozinha visualizam observações em destaque (ex.: *"Sem cebola"*), variações e complementos, marcando itens como *Em Preparo* ou *Pronto* com atualização imediata no Command Center e no portal do garçom.

---

## 4. Catálogo Multicanal & Gestor de Cardápio Digital

No módulo `/admin/menu`, o restaurante gerencia sua oferta comercial com agilidade:

- **Pausa Rápida (86ing)**: Esgotou um item no meio do turno? O gestor pausa ou reativa produtos e complementos instantaneamente com um clique.
- **Precificação e Disponibilidade por Canal**: Permite configurar preços e disponibilidades diferenciadas entre o canal próprio (Vitrine Web / Salão) e canais externos (Marketplaces / iFood), protegendo a margem de lucro do restaurante.
- **Sincronização Inteligente**: Detecção de *diffs* (divergências) entre o catálogo interno e o catálogo publicado em canais externos.

---

## 5. Estoque, Insumos & Ficha Técnica (Receitas)

O módulo `/admin/inventory` conecta as vendas diretamente ao custo de mercadoria vendida (CMV):

- **Cadastro de Insumos**: Controle em gramas (`g`), quilogramas (`kg`), mililitros (`ml`), litros (`l`) ou unidades (`un`), com custo médio e alerta de estoque mínimo.
- **Ficha Técnica de Produtos**: Associação de cada prato/bebida aos seus ingredientes e quantidades exatas consumidas por venda.
- **Baixa e Estorno Automáticos**: A confirmação de um pedido deduz automaticamente os insumos correspondentes; o cancelamento estorna os insumos com rastreabilidade completa no histórico de movimentações.

---

## 6. Hub Financeiro & Frente de Caixa (Turnos de PDV)

No módulo `/admin/financial`, o restaurante mantém controle rigoroso sobre o fluxo de caixa diário:

- **Gestão de Turnos de Caixa (`CashShift`)**: Abertura de caixa com fundo de troco inicial, registro de suprimentos (entradas), sangrias (retiradas) e fechamento cego/auditado com apuração automática de quebras ou sobras por meio de pagamento.
- **Gestão de Despesas Operacionais**: Lançamento e categorização de contas pagas (fornecedores, embalagens, motoboys, utilidades).
- **Conciliação e Resumo Financeiro**: Visão consolidada de receitas brutas, taxas de meios de pagamento, descontos concedidos, despesas e margem operacional.

---

## 7. CRM Gastronômico, Fidelidade & Conformidade LGPD

Ferramentas pensadas para transformar compradores ocasionais em clientes recorrentes (`/admin/marketing` & `/admin/loyalty`):

- **Programa de Fidelidade Nativo**: Configurável por loja (pontos por real gasto e regras de resgate), apoiado em um livro-razão (*ledger*) auditável.
- **Segmentação de Audiência e Campanhas**: Identificação de clientes VIPs, clientes inativos (*churn risk*) e aniversariantes/recorrentes para ações direcionadas.
- **Gestão de Consentimento LGPD**: Registro transparente de *opt-in* e *opt-out* de comunicações de marketing e termos de privacidade por cliente.

---

## 8. Portais Operacionais Dedicados (Garçom & Entregador)

- **Portal do Garçom (`/service`)**: Interface mobile ágil para atendimento de mesas no salão, permitindo abrir/fechar mesas, adicionar novos itens a uma comanda aberta e enviar pedidos direto para as estações do KDS.
- **Portal do Entregador (`/delivery`)**: Painel enxuto para a equipe de motoboys visualizar suas entregas em rota, acionar navegação GPS/WhatsApp do cliente e validar a entrega com o código PIN de confirmação.

---

## 9. Relatórios Executivos & Painel Super Admin SaaS

- **Analytics do Restaurante (`/admin/dashboard`)**: KPIs de faturamento, ticket médio, volume de pedidos por canal e horário, produtos campeões de venda e métricas de tempo de preparo.
- **Governança SaaS (`/super-admin/*`)**: Painel exclusivo para a administração da plataforma Ciboo gerenciar todas as lojas ativas, planos de assinatura, vencimentos e ativação seletiva de *Feature Flags*.
