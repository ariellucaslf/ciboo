import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { BrandLogo } from './Brand';
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="small-line" /> DA SUA COZINHA. PARA O SEU CLIENTE.</p>
          <h1>Seu restaurante.<br />Suas regras.<br /><em>Seu lucro.</em></h1>
          <p className="hero-description">Venda direto, sem comissão por pedido. Do cardápio ao fechamento do caixa, o Ciboo conecta a operação para você cuidar do que faz melhor.</p>
          <div className="hero-actions"><a className="button button-lime" href="#planos">Encontrar meu plano <ArrowUpRight size={19} /></a><a className="text-link" href="#demonstracao">Ver como funciona <ArrowDown size={17} /></a></div>
          <p className="hero-note"><Check size={14} /> Mensalidade fixa. Sem comissão nas vendas do canal próprio.</p>
        </div>
        <div className="hero-art" aria-label="Ilustração de uma comanda: pedido direto, zero comissão Ciboo">
          <div className="art-caption"><span>CASA ABERTA, OPERAÇÃO EM DIA.</span><span>DESDE O PRIMEIRO PEDIDO ↗</span></div>
          <div className="order-sheet">
            <div className="receipt-top"><BrandLogo className="receipt-brand-logo" /><span className="receipt-type">VIA DO<br />RESTAURANTE</span></div>
            <div className="receipt-heading"><span>COMANDA Nº 001</span><span>CANAL PRÓPRIO</span></div>
            <p className="receipt-title">O pedido é seu.<br />O cliente também.</p>
            <div className="receipt-row"><span>01 &nbsp; Cardápio com a sua marca</span><Check size={15} /></div>
            <div className="receipt-row"><span>02 &nbsp; Cozinha no mesmo ritmo</span><Check size={15} /></div>
            <div className="receipt-row"><span>03 &nbsp; Caixa sob controle</span><Check size={15} /></div>
            <div className="receipt-total"><div><span>COMISSÃO CIBOO<br />POR PEDIDO</span><strong>0<span>%</span></strong></div><ArrowUpRight size={45} strokeWidth={1.2} /></div>
            <p className="receipt-bottom">Mais autonomia. Do balcão à entrega.</p>
            <div className="barcode" aria-hidden="true">|||| ||| | |||| || ||| | || |||| | ||| || |||</div>
          </div>
          <div className="art-stamp"><span>FEITO PARA</span><strong>quem põe<br />a mão na massa.</strong><span>GESTÃO + GASTRONOMIA</span></div>
          <span className="art-footnote">TECNOLOGIA QUE RESPEITA A SUA RECEITA.</span>
        </div>
      </div>
      <div className="hero-bottom container"><span>UM SISTEMA. TODA A CASA.</span><p>Delivery próprio <span>✳</span> Salão e mesas <span>✳</span> Cozinha <span>✳</span> Gestão</p><a href="#demonstracao" aria-label="Explorar o Ciboo"><ArrowDown size={20} /></a></div>
    </section>
  );
}
