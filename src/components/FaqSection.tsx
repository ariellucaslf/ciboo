const faqs = [
  { question: 'Preciso comprar equipamentos novos?', answer: 'O Ciboo funciona pelo navegador do celular, tablet ou computador. Se sua operação usa impressão, há suporte a comandas em bobinas de 58 e 80 mm. A compatibilidade da impressora e da conexão pode ser conferida na implantação.' },
  { question: 'Como funciona a comissão por pedido?', answer: 'A Ciboo cobra uma assinatura fixa, sem comissão sobre as vendas do seu canal próprio. Taxas de maquininha, serviços de pagamento, entrega e marketplaces são cobradas pelos respectivos fornecedores quando utilizados.' },
  { question: 'Como recebo o dinheiro das vendas?', answer: 'Nos pagamentos por PIX direto, o cliente usa a chave do seu restaurante. No recebimento presencial, você usa sua maquininha ou seu caixa. As condições dos serviços de pagamento utilizados continuam valendo.' },
  { question: 'Posso continuar vendendo pelo iFood?', answer: 'Sim. A partir do plano Pro, a integração reúne os pedidos do iFood e do canal próprio na central de pedidos e na cozinha. As taxas e condições do iFood continuam vinculadas ao seu contrato com o marketplace.' },
  { question: 'Tenho ajuda para configurar meu cardápio?', answer: 'Sim. A equipe auxilia na configuração inicial da loja, fotos, categorias, adicionais e taxas de entrega. O plano Enterprise inclui acompanhamento dedicado na implantação.' },
  { question: 'Existe fidelidade ou multa para cancelar?', answer: 'Os planos mensais não têm fidelidade nem multa de cancelamento. Para a assinatura anual, confira as condições do ciclo contratado antes de concluir a adesão.' },
];
export default function FaqSection() {
  return <section id="faq" className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">05 / SEM PONTAS SOLTAS</p><h2>Pode perguntar.<br /><em>A casa é sua.</em></h2></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} className="faq-item" open={index === 0}><summary>{faq.question}<span aria-hidden="true" className="faq-plus">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
