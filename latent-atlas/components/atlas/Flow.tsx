'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import type {FlowNode, ModelEntry} from '@/lib/atlas/models';
import {ui, type Lang} from '@/lib/atlas/pt';

/** Posicao por aritmetica, nao por medicao. Cada no principal ocupa duas
 *  linhas da grade: a propria e a do conector abaixo dela. Um no lateral
 *  entra na linha do no a que se liga, na segunda coluna. Nada aqui le
 *  getBoundingClientRect, entao carregar a fonte ou girar a tela nao
 *  desalinha um unico conector. */
export default function Flow({model, lang = 'en'}: {model: ModelEntry; lang?: Lang}) {
  const t = ui[lang];
  const flow = model.flow ?? [];
  const main = flow.filter((n) => n.lane === 'main');
  const sides = flow.filter((n) => n.lane === 'side');
  const [picked, setPicked] = useState(main[0]?.id ?? flow[0]?.id);
  const node = flow.find((n) => n.id === picked) ?? main[0];
  const rowOf = (id: string) => main.findIndex((n) => n.id === id) * 2 + 1;

  const card = (n: FlowNode, row: number, column: number) => (
    <button
      key={n.id}
      type="button"
      className={`flow-node${n.lane === 'side' ? ' is-side' : ''}${picked === n.id ? ' is-picked' : ''}`}
      style={{gridRow: row, gridColumn: column}}
      aria-pressed={picked === n.id}
      onClick={() => setPicked(n.id)}
    >
      <span className="flow-kicker">
        <span className="flow-dot" aria-hidden="true" />
        {n.lane === 'main' ? String(main.findIndex((m) => m.id === n.id) + 1).padStart(2, '0') : t.side} · {n.kicker}
      </span>
      <span className="flow-title">{n.title}</span>
      <span className="flow-summary">{n.summary}</span>
    </button>
  );

  return (
    <section className="flow" aria-label={`${model.name} architecture`}>
      <div className="flow-head">
        <h2>{t.howBuilt}</h2>
        <span className="eyebrow">{t.pickComponent}</span>
      </div>
      <div className="flow-body">
        <div className="flow-canvas">
          {main.map((n, i) => (
            <div key={`g-${n.id}`} style={{display: 'contents'}}>
              {card(n, i * 2 + 1, 1)}
              {/* o lateral e irmao imediato do seu principal: empilhado em
                  coluna unica ele cai logo abaixo dele, sem regra extra */}
              {sides.filter((s) => s.attachesTo === n.id).map((s) => card(s, rowOf(n.id), 2))}
              {n.carries && i < main.length - 1 && (
                <span className="flow-edge" style={{gridRow: i * 2 + 2, gridColumn: 1}}>
                  <span>{n.carries}</span>
                </span>
              )}
            </div>
          ))}
        </div>
        <aside className="flow-inspector" aria-live="polite">
          <span className="eyebrow">{t.component}</span>
          <h3>{node.title}</h3>
          <p>{node.detail}</p>
          {node.carries && (
            <p className="flow-meta">
              <span className="eyebrow">{t.passesOn}</span>
              {node.carries}
            </p>
          )}
          {node.lane === 'side' && node.attachesTo && (
            <p className="flow-meta">
              <span className="eyebrow">{t.attachesTo}</span>
              {flow.find((f) => f.id === node.attachesTo)?.title}
            </p>
          )}
          {node.exhibit && (
            <Link className="btn secondary small glass lit lit-swell" data-lit href={`/exhibits/${node.exhibit.slug}`}>
              {node.exhibit.label} <ArrowUpRight size={15} />
            </Link>
          )}
        </aside>
      </div>
    </section>
  );
}
