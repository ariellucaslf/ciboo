import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://app.ciboo.food'),
  title: 'Ciboo — Seu restaurante. Suas regras. Seu lucro.',
  description:
    'Venda direto para os seus clientes com zero comissão. Cardápio digital de alta conversão, Live Command Center, KDS de cozinha por praças, mesas QR Code, controle de estoque com ficha técnica e integração iFood.',
  keywords: [
    'cardápio digital',
    'sistema para restaurantes',
    'kds cozinha',
    'delivery sem taxas',
    'gestão gastronômica',
    'integração ifood',
    'comanda eletrônica',
    'ficha técnica restaurante',
    'ciboo food',
  ],
  openGraph: {
    title: 'Ciboo — Venda Direto. Zero Comissões sobre seus Pedidos.',
    description:
      'Cardápio digital próprio, KDS de cozinha em tempo real, integração iFood e controle total do seu restaurante.',
    images: ['/ciboo-logo.jpeg'],
    type: 'website',
  },
  icons: {
    icon: '/ciboo-logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
