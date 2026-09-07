'use client';
import Link from 'next/link';
import Script from 'next/script';
import {type CSSProperties, type ReactNode} from 'react';
import {BookOpen, Compass, Boxes, GitCompare, Route as RouteIcon} from 'lucide-react';
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {links} from '@/lib/museum/content';
import {exhibitsFor} from '@/lib/museum/i18n';
import {ui, type Lang} from '@/lib/atlas/pt';
import ModeSwitch from './ModeSwitch';

/** Endereco por lingua. O portugues mora sob /pt e o ingles na raiz, entao
 *  um unico prefixo resolve todos os links da casca e das paginas. */
export const href = (lang: Lang, path: string) => (lang === 'pt' ? (path === '/' ? '/pt' : `/pt${path}`) : path);

/** A casca e uma so: barra lateral, campo de luz e rodape. Tudo que e rota
 *  nova entra por children, entao a navegacao nao vive em dois arquivos. */
export default function Shell({lang = 'en', active, title, children}: {lang?: Lang; active: string; title: string; children: ReactNode}) {
  const t = ui[lang];
  const L = (p: string) => href(lang, p);
  const exhibits = exhibitsFor(lang);
  /* A troca de lingua tem de cair na mesma pagina, e um experimento mora sob
     /exhibits: montar o endereco a partir do nome ativo levava para /classical,
     que nao existe. */
  const here =
    active === 'map'
      ? '/'
      : exhibits.some((e) => e.slug === active)
        ? links(active)
        : `/${active}`;
  return (
    <SidebarProvider style={{'--sidebar-width': '252px'} as CSSProperties}>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Sidebar className="museum-sidebar">
        <SidebarHeader>
          <Link className="brand" href={L('/')}>
            {/* helice do sprite do Pure: o conjunto da linguagem divide
                caixa, ponta e espessura com o resto da interface */}
            <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true" width="32" height="32">
              <use href="/latent-atlas/pure/icons.svg#helix" />
            </svg>
            <span>{t.brand}<small>{t.brandSub}</small></span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <div className="eyebrow nav-label">{t.groupAtlas}</div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={active === 'map'} className="nav-item">
                <Link href={L('/')}><Compass size={17} /><span>{t.navBig}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={active === 'start'} className="nav-item">
                <Link href={L('/start')}><RouteIcon size={17} /><span>{t.navStart}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={active === 'models'} className="nav-item">
                <Link href={L('/models')}><Boxes size={17} /><span>{t.navModels}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={active === 'compare'} className="nav-item">
                <Link href={L('/compare')}><GitCompare size={17} /><span>{t.navCompare}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="eyebrow nav-label">{t.groupFoundations}</div>
          <SidebarMenu>
            {exhibits.slice(1).map((e, i) => (
              <SidebarMenuItem key={e.slug}>
                <SidebarMenuButton asChild isActive={active === e.slug} className="nav-item">
                  <Link href={L(links(e.slug))} aria-current={active === e.slug ? 'page' : undefined}>
                    <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{e.short}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={active === 'glossary'} className="nav-item">
                <Link href={L('/glossary')}><BookOpen size={17} /><span>{t.navDictionary}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="side-bottom">
            <span className="eyebrow">{t.sideKicker}</span>
            <p>{t.sideCopy[0]}<br />{t.sideCopy[1]}</p>
            {/* o seletor guarda a pagina: quem esta no catalogo em ingles cai
                no catalogo em portugues, e nao na raiz */}
            <div className="modes" role="group" aria-label={t.language}>
              <Link className="mode-btn" href={href('en', here)} aria-current={lang === 'en' ? 'page' : undefined}>
                English
              </Link>
              <Link className="mode-btn" href={href('pt', here)} aria-current={lang === 'pt' ? 'page' : undefined}>
                Português
              </Link>
            </div>
            <ModeSwitch />
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="main-shell lit-field" data-lit>
        <header className="topbar">
          <SidebarTrigger className="mobile-toggle" />
          <span className="topbar-current">{title}</span>
        </header>
        <main id="main-content" className="content">{children}</main>
      </div>
      <Script src="/latent-atlas/pure/light.js" strategy="afterInteractive" />
    </SidebarProvider>
  );
}

export function Footer({lang = 'en'}: {lang?: Lang}) {
  const t = ui[lang];
  return (
    <footer className="footer">
      <span>Proteins in a World of LLMs<span className="footer-sep"> / </span>{t.footerTag}</span>
      <span>{t.footerNote}</span>
    </footer>
  );
}
