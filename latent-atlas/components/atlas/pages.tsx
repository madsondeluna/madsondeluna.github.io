'use client';
import Link from 'next/link';
import {useState} from 'react';
import {ArrowUpRight, ArrowRight, ArrowLeft} from 'lucide-react';
import Shell, {Footer, href as L} from '@/components/museum/Shell';
import Flow from './Flow';
import {models, comparisons, tasks, findModel, type ModelEntry, type Source} from '@/lib/atlas/models';
import {teaching, routes} from '@/lib/atlas/teaching';
import {ui, modelsPt, comparisonsPt, teachingPt, routesPt, type Lang} from '@/lib/atlas/pt';

/** O texto em portugues cobre o que muda de lingua; o resto cai no ingles.
 *  Um campo faltando devolve o original em vez de um espaco vazio. */
function localise(m: ModelEntry, lang: Lang) {
  if (lang === 'en') return m;
  const t = modelsPt[m.slug];
  if (!t) return m;
  const flow = m.flow?.map((n) => {
    const f = t.flow?.[n.id];
    return f ? {...n, ...f, exhibit: n.exhibit && f.exhibit ? {...n.exhibit, label: f.exhibit} : n.exhibit} : n;
  });
  return {...m, ...t, flow: flow ?? m.flow} as ModelEntry;
}

function Sources({sources, lang}: {sources: Source[]; lang: Lang}) {
  const t = ui[lang];
  return (
    <div className="sources">
      {sources.map((s) => (
        <a key={s.url} className="source-row hover-surface" href={s.url} target="_blank" rel="noreferrer">
          <span className="source-main">
            <span className="source-label">{s.label}</span>
            <span className="source-kind">{t.kinds[s.kind]}</span>
          </span>
          <ArrowUpRight size={15} />
        </a>
      ))}
    </div>
  );
}

function ModelCard({m, lang}: {m: ModelEntry; lang: Lang}) {
  const t = ui[lang];
  const l = localise(m, lang);
  return (
    <Link className="model-card card-glass lit" data-lit href={L(lang, `/models/${m.slug}`)}>
      <span className="card-meta">
        <span>{t.taskNames[m.task] ?? m.task}</span>
        <span className="num">{m.year}</span>
      </span>
      <h3>{m.name}</h3>
      <p className="model-tagline">{l.tagline}</p>
      <p>{l.what.split('. ')[0]}.</p>
      <span className="card-link">
        {m.flow ? t.exploreArch : t.readEntry} <ArrowRight size={16} />
      </span>
    </Link>
  );
}

export function Catalogue({lang = 'en'}: {lang?: Lang}) {
  const t = ui[lang];
  const [task, setTask] = useState('All');
  const shown = task === 'All' ? models : models.filter((m) => m.task === task);
  const withFlow = models.filter((m) => m.flow).length;
  return (
    <Shell lang={lang} active="models" title={t.navModels}>
      <div className="intro">
        <div>
          <span className="eyebrow">{t.catalogueKicker}</span>
          <h1>{t.catalogueHead[0]}<em>{t.catalogueHead[1]}</em>.</h1>
          <p className="justify">{t.catalogueLede}</p>
        </div>
        <span className="intro-number" aria-hidden="true">{models.length}</span>
      </div>

      <div className="filter-row" role="group" aria-label={t.filterLabel}>
        {['All', ...tasks].map((k) => (
          <button
            key={k}
            type="button"
            className="pill pill-sm glass lit lit-swell"
            data-lit
            aria-pressed={task === k}
            onClick={() => setTask(k)}
          >
            {k === 'All' ? t.filterAll : t.taskNames[k] ?? k}
          </button>
        ))}
      </div>

      <div className="model-grid">
        {shown.map((m) => (
          <ModelCard key={m.slug} m={m} lang={lang} />
        ))}
      </div>

      <div className="section-head">
        <h2>{t.readTwo}</h2>
        <span>{t.diagramCount(withFlow)}</span>
      </div>
      <div className="rows-list">
        {comparisons.map((c) => {
          const p = lang === 'pt' ? comparisonsPt[c.slug] : undefined;
          return (
            <Link key={c.slug} className="list-row hover-surface" href={L(lang, '/compare')}>
              <span className="row-main">
                <span className="row-title">{p?.title ?? c.title}</span>
                <span className="row-meta">{p?.question ?? c.question}</span>
              </span>
              <ArrowRight size={16} />
            </Link>
          );
        })}
      </div>
      <Footer lang={lang} />
    </Shell>
  );
}

export function ModelPage({slug, lang = 'en'}: {slug: string; lang?: Lang}) {
  const base = findModel(slug);
  if (!base) return null;
  const t = ui[lang];
  const m = localise(base, lang);
  const others = models.filter((o) => o.task === base.task && o.slug !== base.slug).slice(0, 3);
  const en = teaching[base.slug];
  const pt = lang === 'pt' ? teachingPt[base.slug] : undefined;
  const teach = en ? {...en, ...pt, example: en.example ? {...en.example, ...pt?.example} : undefined} : undefined;
  return (
    <Shell lang={lang} active="models" title={base.name}>
      <div className="intro">
        <div>
          <span className="eyebrow">{t.taskNames[base.task] ?? base.task} · {base.family} · {base.year}</span>
          <h1>{base.name}</h1>
          <p className="justify">{m.what}</p>
        </div>
      </div>

      {teach && (
        <section className="teach">
          <div className="teach-block">
            <span className="eyebrow">{t.plain}</span>
            <p className="lede justify">{teach.plain}</p>
          </div>
          <div className="teach-block">
            <span className="eyebrow">{t.analogy}</span>
            <p className="justify">{teach.analogy}</p>
          </div>
          <div className="teach-block">
            <span className="eyebrow">{t.misread}</span>
            <p className="justify">{teach.misread}</p>
          </div>
        </section>
      )}

      {m.flow ? <Flow model={m} lang={lang} /> : null}

      {teach?.example && (
        <section className="example">
          <div className="section-head">
            <h2>{t.tryIt}</h2>
            <span>{teach.example.title}</span>
          </div>
          <div className="example-body">
            <pre className="code-block"><code>{teach.example.code}</code></pre>
            <aside className="example-side">
              <p className="flow-meta"><span className="eyebrow">{t.youNeed}</span>{teach.example.needs}</p>
              <p className="flow-meta"><span className="eyebrow">{t.weight}</span>{teach.example.weight}</p>
              <p className="flow-meta"><span className="eyebrow">{t.howToRead}</span>{teach.example.reads}</p>
            </aside>
          </div>
          <p className="small-note">{t.notRun}</p>
        </section>
      )}

      <div className="info-grid">
        <article className="info-block">
          <span className="eyebrow">01 / {t.whyHere}</span>
          <h3>{t.standing}</h3>
          <p className="justify">{m.standing}</p>
        </article>
        <article className="info-block">
          <span className="eyebrow">02 / {t.setsApart}</span>
          <h3>{t.distinctions}</h3>
          <ul className="tight-list">
            {m.distinct.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </article>
        <article className="info-block">
          <span className="eyebrow">03 / {t.whereStops}</span>
          <h3>{t.limits}</h3>
          <p className="justify">{m.limits}</p>
        </article>
      </div>

      <div className="section-head">
        <h2>{t.weightsCode}</h2>
        <span>{t.weightsNote}</span>
      </div>
      <div className="table-scroll">
        <table className="model-table">
          <thead>
            <tr>
              <th>{t.thRepo}</th>
              <th>{t.thSize}</th>
              <th>{t.thLicence}</th>
              <th>{t.thNote}</th>
            </tr>
          </thead>
          <tbody>
            {base.checkpoints.map((c) => (
              <tr key={c.repo}>
                <td className="mono">{c.repo}</td>
                <td>{c.params}</td>
                <td>{c.license}</td>
                <td>{c.note ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-head">
        <h2>{t.sources}</h2>
        <span>{t.sourcesNote}</span>
      </div>
      <Sources sources={base.sources} lang={lang} />

      {others.length > 0 && (
        <>
          <div className="section-head">
            <h2>{t.sameTask}</h2>
            <span>{t.taskNames[base.task] ?? base.task}</span>
          </div>
          <div className="model-grid">
            {others.map((o) => (
              <ModelCard key={o.slug} m={o} lang={lang} />
            ))}
          </div>
        </>
      )}

      <div className="next-exhibit">
        <span>
          <Link href={L(lang, '/models')}>
            <ArrowLeft size={16} /> {t.backToCatalogue}
          </Link>
        </span>
        <Link href={L(lang, '/compare')}>
          {t.compareNeighbours} <ArrowRight size={16} />
        </Link>
      </div>
      <Footer lang={lang} />
    </Shell>
  );
}

export function ComparePage({lang = 'en'}: {lang?: Lang}) {
  const t = ui[lang];
  return (
    <Shell lang={lang} active="compare" title={t.navCompare}>
      <div className="intro">
        <div>
          <span className="eyebrow">{t.compareKicker}</span>
          <h1>{t.compareHead[0]}<em>{t.compareHead[1]}</em>.</h1>
          <p className="justify">{t.compareLede}</p>
        </div>
        <span className="intro-number" aria-hidden="true">{comparisons.length}</span>
      </div>

      {comparisons.map((c) => {
        const p = lang === 'pt' ? comparisonsPt[c.slug] : undefined;
        return (
          <section key={c.slug} className="compare-block">
            <div className="section-head">
              <h2>{p?.title ?? c.title}</h2>
              <span>{p?.question ?? c.question}</span>
            </div>
            <div className="table-scroll">
              <table className="model-table compare-table">
                <thead>
                  <tr>
                    <th />
                    {c.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r) => {
                    const rp = p?.rows?.[r.label];
                    return (
                      <tr key={r.label}>
                        <th scope="row">{rp?.label ?? r.label}</th>
                        {(rp?.cells ?? r.cells).map((cell, i) => (
                          <td key={c.columns[i]}>{cell}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="compare-reading justify">{p?.reading ?? c.reading}</p>
            <Sources sources={c.sources} lang={lang} />
          </section>
        );
      })}
      <Footer lang={lang} />
    </Shell>
  );
}

export function RoutesPage({lang = 'en'}: {lang?: Lang}) {
  const t = ui[lang];
  return (
    <Shell lang={lang} active="start" title={t.navStart}>
      <div className="intro">
        <div>
          <span className="eyebrow">{t.routesKicker}</span>
          <h1>{t.routesHead[0]}<em>{t.routesHead[1]}</em>.</h1>
          <p className="justify">{t.routesLede}</p>
        </div>
        <span className="intro-number" aria-hidden="true">{routes.length}</span>
      </div>
      {routes.map((r) => {
        const p = lang === 'pt' ? routesPt[r.slug] : undefined;
        return (
          <section key={r.slug} className="route-block">
            <div className="section-head">
              <h2>{p?.title ?? r.title}</h2>
              <span>{p?.time ?? r.time}</span>
            </div>
            <p className="route-who justify">{p?.who ?? r.who}</p>
            <ol className="route-steps">
              {r.steps.map((s, i) => (
                <li key={s.href + i}>
                  <Link className="route-step hover-surface" href={L(lang, s.href)}>
                    <span className="route-num num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="row-main">
                      <span className="row-title">{p?.steps?.[i]?.label ?? s.label}</span>
                      <span className="row-meta justify">{p?.steps?.[i]?.why ?? s.why}</span>
                    </span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
      <Footer lang={lang} />
    </Shell>
  );
}
