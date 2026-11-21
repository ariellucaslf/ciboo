'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from './Brand';
const links = [{ href: '#demonstracao', label: 'Como funciona' }, { href: '#recursos', label: 'Recursos' }, { href: '#calculadora', label: 'Sua economia' }, { href: '#planos', label: 'Planos' }];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <div className="nav-actions"><a className="login-link" href="https://app.ciboo.food/login">Entrar</a><a className="button button-small" href="#planos">Conhecer os planos <ArrowUpRight size={16} /></a></div>
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav container" aria-label="Navegação móvel">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></a>)}<a href="https://app.ciboo.food/login">Entrar na plataforma <ArrowUpRight size={16} /></a></nav>}
    </header>
  );
}
