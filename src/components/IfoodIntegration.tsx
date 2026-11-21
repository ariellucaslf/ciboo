import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import './ifood-integration.css';

export default function IfoodIntegration() {
  return (
    <aside id="integracao-ifood" className="ifood-section" aria-labelledby="ifood-title">
      <div className="container ifood-inner">
        <div className="ifood-copy">
          <div className="ifood-heading">
            <Image src="/ifood-logo.png" alt="iFood" width={2000} height={1075} sizes="76px" className="ifood-original-logo" />
            <span>INTEGRAÇÃO A PARTIR DO PLANO PRO</span>
          </div>
          <h2 id="ifood-title">O pedido vem do iFood.<br /><em>A operação fica no Ciboo.</em></h2>
          <p>Continue vendendo no iFood e acompanhe esses pedidos na mesma central do seu delivery próprio e das mesas. A origem fica identificada em cada comanda, do recebimento à cozinha.</p>
          <a href="#planos" className="text-link">Ver o plano Pro <ArrowRight size={17} /></a>
        </div>
        <div className="ifood-flow">
          <p className="ifood-flow-label">TODOS OS CANAIS. UM FLUXO DE TRABALHO.</p>
          <ol>
            <li><span>01</span><div><strong>Receba na central</strong><p>Pedidos do iFood, da loja online e do salão identificados por canal.</p></div></li>
            <li><span>02</span><div><strong>Organize o preparo</strong><p>Acompanhe os itens e as observações na tela da cozinha.</p></div></li>
            <li><span>03</span><div><strong>Acompanhe a expedição</strong><p>Visualize os pedidos prontos e o andamento da entrega.</p></div></li>
          </ol>
          <p className="ifood-contract-note"><Check size={14} /> A integração mantém as taxas e condições do seu contrato com o iFood.</p>
        </div>
      </div>
    </aside>
  );
}
