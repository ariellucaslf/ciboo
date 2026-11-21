import { Bike, Boxes, HeartHandshake, Printer, QrCode, Receipt } from 'lucide-react';
const features = [
  { icon: QrCode, title: 'Salão sem vai e volta', text: 'Pedidos por QR Code e app do garçom. A comanda sai da mesa direto para a cozinha.' },
  { icon: Boxes, title: 'Cada ingrediente conta', text: 'Ficha técnica, custo de mercadoria e baixa automática. Saiba quando é hora de repor.' },
  { icon: Receipt, title: 'Feche o dia com clareza', text: 'Abertura e fechamento de caixa, sangrias, despesas e conferência por forma de pagamento.' },
  { icon: HeartHandshake, title: 'Dê um motivo para voltar', text: 'Pontos, cupons e histórico de clientes. Relacionamento com consentimento e cuidado com os dados.' },
  { icon: Bike, title: 'Entrega bem acompanhada', text: 'App para o entregador, acesso à rota e confirmação de recebimento com código PIN.' },
  { icon: Printer, title: 'Do seu jeito de trabalhar', text: 'Impressão térmica em 58 ou 80 mm, relatórios de vendas e pedidos do iFood integrados à operação.' },
];
export default function FeaturesGrid() {
  return <section id="recursos" className="section features-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">02 / CADA PARTE DA OPERAÇÃO</p><h2>Uma casa bem gerida.<br /><em>De ponta a ponta.</em></h2></div><p>As ferramentas de que você precisa,<br />trabalhando juntas.</p></div><div className="features-list">{features.map((feature, index) => <article key={feature.title} className="feature-item"><div className="feature-number">0{index + 1}<feature.icon size={23} strokeWidth={1.4} /></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></div></section>;
}
