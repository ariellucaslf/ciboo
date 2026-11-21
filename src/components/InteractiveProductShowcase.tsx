'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Maximize2, X } from 'lucide-react';
import './product-showcase.css';

const screens = [
  {
    label: 'Cardápio digital',
    title: 'O cardápio que o seu cliente vai usar.',
    text: 'Categorias, destaques, adicionais e carrinho. A vitrine do restaurante no navegador, com opções de entrega e retirada.',
    image: '/demo/cardapio.webp',
    alt: 'Cardápio real do Ciboo com categorias, estimativas de entrega e retirada, produtos e preços da loja de demonstração Casa do Sabor.',
    caption: 'Vitrine do cliente · navegação por categorias e escolha de produtos.',
  },
  {
    label: 'Central de pedidos',
    title: 'iFood, loja online e salão. Na mesma operação.',
    text: 'Esta é a central atual do Ciboo: quatro etapas, filtros por canal, situação do pagamento e ações de preparo e expedição.',
    image: '/demo/central-pedidos.webp',
    alt: 'Central real do Ciboo com filtros Todos, Loja Online, Mesas do Salão e iFood; colunas Novos Pedidos, Na Cozinha, Prontos para Entrega e Concluídos.',
    caption: 'Operação Ao Vivo · pedidos do iFood identificados junto aos do canal próprio e das mesas.',
  },
  {
    label: 'Cozinha · KDS',
    title: 'A comanda chega com tudo o que importa.',
    text: 'A tela de cozinha mostra os itens, as observações, o canal de origem e o tempo de cada pedido. O preparo avança até a expedição.',
    image: '/demo/cozinha.webp',
    alt: 'Tela real da cozinha Ciboo com filtros de salão, delivery e retirada, cronômetros e comandas com observação sem cebola e identificação do iFood.',
    caption: 'Modo Cozinha · comandas, tempos de preparo e observações em destaque.',
  },
  {
    label: 'Estoque e ficha técnica',
    title: 'Os insumos por trás de cada prato.',
    text: 'Saldos, estoque mínimo, custo dos ingredientes, fichas técnicas e entrada de compras. Uma visão concreta do que a sua cozinha tem disponível.',
    image: '/demo/estoque.webp',
    alt: 'Gestão real de estoque Ciboo com totais de insumos, alerta de estoque mínimo, custo em estoque e tabela de ingredientes, saldos e ações de contagem.',
    caption: 'Gestão de Estoque & Ficha Técnica · saldos, custos e alertas de reposição.',
  },
];

export default function InteractiveProductShowcase() {
  const [active, setActive] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const screen = screens[active];

  function changeTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % screens.length;
    else if (event.key === 'ArrowLeft') next = (index + screens.length - 1) % screens.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = screens.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="demonstracao" className="section demo-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / CONHEÇA A CASA</p>
            <h2>Por dentro do Ciboo.<br /><em>Como ele é.</em></h2>
          </div>
          <p>Telas do sistema atual.<br />Dados fictícios para você conhecer a operação.</p>
        </div>

        <div className="demo-tabs" role="tablist" aria-label="Telas do sistema Ciboo">
          {screens.map((item, index) => (
            <button
              key={item.label}
              ref={node => { tabRefs.current[index] = node; }}
              role="tab"
              id={`demo-tab-${index}`}
              aria-selected={active === index}
              aria-controls="demo-panel"
              tabIndex={active === index ? 0 : -1}
              onKeyDown={event => changeTab(event, index)}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>{item.label}<ArrowRight size={16} />
            </button>
          ))}
        </div>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${active}`} tabIndex={0}>
          <div className="demo-intro">
            <h3>{screen.title}</h3>
            <p>{screen.text}</p>
          </div>
          <figure className="product-capture">
            <button
              className="capture-trigger"
              type="button"
              aria-label={`Ampliar tela: ${screen.label}`}
              aria-haspopup="dialog"
              onClick={() => dialogRef.current?.showModal()}
            >
              <Image
                src={screen.image}
                alt={screen.alt}
                width={2880}
                height={1800}
                unoptimized
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1240px) calc(100vw - 80px), 1160px"
                className="capture-image"
              />
              <span className="capture-expand"><Maximize2 size={15} /> Ampliar tela</span>
            </button>
            <figcaption>
              <p>{screen.caption}</p>
              <span>Captura do produto · dados de demonstração</span>
            </figcaption>
          </figure>
        </div>

        <dialog ref={dialogRef} className="capture-dialog" aria-labelledby="capture-dialog-title">
          <div className="capture-dialog-heading">
            <div><h3 id="capture-dialog-title">{screen.label}</h3><p>Tela do sistema atual, com dados fictícios.</p></div>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar tela ampliada"><X size={22} /></button>
          </div>
          <div className="capture-dialog-scroll" tabIndex={0} aria-label="Captura ampliada; role para ver os detalhes">
            <Image src={screen.image} alt={screen.alt} width={2880} height={1800} unoptimized className="capture-dialog-image" />
          </div>
          <p className="capture-dialog-hint">No celular, deslize para os lados para explorar a tela. Pressione Esc ou use o botão para fechar.</p>
        </dialog>
      </div>
    </section>
  );
}
