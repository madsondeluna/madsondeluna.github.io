// Resolucao de lingua para os experimentos. Uma funcao por tipo de conteudo,
// e todas caem no ingles quando falta traducao, para que a tela nunca fique
// com um campo vazio.
import {exhibits, details} from './content';
import {exhibitsPt, detailsPt, labPt} from './pt-content';
import {glossaryPt, categoriesPt} from './pt-glossary';
import {terms, type Term} from './glossary';
import type {Lang} from '@/lib/atlas/pt';

export const exhibitsFor = (lang: Lang) =>
  lang === 'pt' ? exhibits.map((e) => ({...e, ...(exhibitsPt[e.slug] ?? {})})) : exhibits;

export const exhibitFor = (slug: string, lang: Lang) => exhibitsFor(lang).find((e) => e.slug === slug);

export const detailFor = (slug: string, lang: Lang) => {
  const base = details[slug] ?? details.map;
  if (lang !== 'pt') return base;
  const p = detailsPt[slug];
  return p ? {...base, ...p} : base;
};

export const termsFor = (lang: Lang): Term[] =>
  lang === 'pt'
    ? terms.map((t) => {
        const p = glossaryPt[t.id];
        return p
          ? {...t, ...p, category: categoriesPt[t.category] ?? t.category, aliases: [...p.aliases, ...t.aliases]}
          : {...t, category: categoriesPt[t.category] ?? t.category};
      })
    : terms;

/** Rotulo de interface. Em ingles devolve a propria chave, entao o codigo
 *  chama t('Dictionary') e continua legivel sem consultar tabela. */
export const t = (lang: Lang, key: string) => (lang === 'pt' ? labPt[key] ?? key : key);

/** Numero decimal na convencao da lingua. Em portugues o separador e a
 *  virgula, e isso vale para tudo que a tela mostra como quantidade: pesos,
 *  probabilidades, perdas, celulas da matriz de atencao. Identificadores
 *  (ESM-2, posto 1), anos e os trechos de codigo continuam com ponto. */
export const num = (lang: Lang, value: number, digits: number) => {
  const fixed = value.toFixed(digits);
  return lang === 'pt' ? fixed.replace('.', ',') : fixed;
};
