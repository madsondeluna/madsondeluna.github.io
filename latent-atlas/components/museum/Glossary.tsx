'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Search,ArrowUpRight,BookOpen} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {Tooltip,TooltipTrigger,TooltipContent} from '@/components/ui/tooltip';
import {type Term} from '@/lib/museum/glossary';
import {termsFor,t as tr} from '@/lib/museum/i18n';
import {type Lang} from '@/lib/atlas/pt';
import {Choice} from './common';
function path(t:Term){return t.exhibit==='map'?'/':`/exhibits/${t.exhibit}`}
export function TermWord({term,children}:{term:Term;children:string}){const [open,setOpen]=useState(false);return <><Tooltip><TooltipTrigger asChild><button className="term-word" onClick={()=>setOpen(true)} aria-label={`Definition of ${term.name}`}>{children}</button></TooltipTrigger><TooltipContent className="tooltip-copy"><strong>{term.name}</strong><br/>{term.plain}<br/><span style={{fontSize:12}}>Select for an example.</span></TooltipContent></Tooltip><Dialog open={open} onOpenChange={setOpen}><DialogContent className="term-dialog"><span className="eyebrow">The AI dictionary / {term.category}</span><DialogTitle className="term-title">{term.name}</DialogTitle><DialogDescription style={{fontSize:16,lineHeight:1.8}}>{term.plain}</DialogDescription><p className="muted" style={{fontSize:14}}>{term.technical}</p><div className="definition-example"><span className="eyebrow">A concrete example</span><p>{term.example}</p></div><Link className="btn secondary" href={`/glossary#${term.id}`}>Open in the dictionary <ArrowUpRight size={15}/></Link></DialogContent></Dialog></>}
// Longer phrases match first. Skip generic words that would make prose noisy.
const skipped=new Set(['model','value','key','head','mask','rank','frozen','validation','epoch','layer']);
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
/* O indice depende da lingua, entao ele e construido uma vez por lingua e
   guardado: refazer a expressao regular a cada paragrafo custaria caro numa
   pagina que a chama dezenas de vezes. */
const indexes=new Map<Lang,{entries:{word:string;term:Term}[];pattern:RegExp}>();
function indexFor(lang:Lang){
  const cached=indexes.get(lang);
  if(cached)return cached;
  const entries=termsFor(lang).filter(t=>!skipped.has(t.id)).flatMap(t=>[t.name,...t.aliases].map(word=>({word,term:t}))).sort((a,b)=>b.word.length-a.word.length);
  const built={entries,pattern:new RegExp(`\\b(${entries.map(e=>escape(e.word)).join('|')})\\b`,'gi')};
  indexes.set(lang,built);
  return built;
}
export function GlossaryText({text,lang='en'}:{text:string;lang?:Lang}){const {entries,pattern}=indexFor(lang);const pieces=text.split(pattern);return <>{pieces.map((p,i)=>{if(i%2===0)return p;const term=entries.find(e=>e.word.toLowerCase()===p.toLowerCase())?.term;return term?<TermWord key={i} term={term}>{p}</TermWord>:p})}</>}
export function Glossary({lang='en'}:{lang?:Lang}){const terms=termsFor(lang);const t2=(k:string)=>tr(lang,k);
  /* as categorias saem dos proprios termos: fixa-las em ingles fazia o filtro
     nao casar com nada depois da traducao */
  const cats=['All',...Array.from(new Set(terms.map(x=>x.category)))];const [query,setQuery]=useState(''),[category,setCategory]=useState('All');/* Busca com um erro de digitacao perdoado. A distancia so e calculada
     quando a busca literal falha e a palavra tem cinco letras ou mais: e o
     ponto onde um caractere trocado deixa de ser ambiguidade e vira engano. */
  const near=(word:string,q:string)=>{
    if(q.length<5||Math.abs(word.length-q.length)>1)return false;
    let i=0,j=0,slips=0;
    while(i<word.length&&j<q.length){
      if(word[i]===q[j]){i++;j++;continue}
      if(++slips>1)return false;
      if(word.length>q.length)i++; else if(word.length<q.length)j++; else {i++;j++}
    }
    return slips+(word.length-i)+(q.length-j)<=1;
  };
  const hit=(t:typeof terms[number])=>{
    const q=query.trim().toLowerCase();
    if(!q)return true;
    const hay=[t.name,...t.aliases,t.plain,t.technical].join(' ').toLowerCase();
    if(hay.includes(q))return true;
    return [t.name,...t.aliases].some(w=>w.toLowerCase().split(/[\s-]+/).some(part=>near(part,q)));
  };
  const inCategory=terms.filter(t=>(category==='All'||category===t.category)&&hit(t)).sort((a,b)=>a.name.localeCompare(b.name));
  const anywhere=terms.filter(hit).sort((a,b)=>a.name.localeCompare(b.name));
  /* Uma busca que acha algo, mas nao na categoria aberta, mostrava zero e
     deixava o motivo escondido no filtro. Agora ela abre o resto e diz que
     abriu. */
  const widened=inCategory.length===0&&anywhere.length>0&&category!=='All';
  const results=widened?anywhere:inCategory;return <><div className="dictionary-search"><Search size={19}/><label className="sr-only" htmlFor="dictionary-search">Find a concept</label><Input id="dictionary-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t2('Try node, perceptron, LoRA, embedding…')}/></div><Choice label={t2('Dictionary category')} value={category} onChange={setCategory} items={cats.map(s=>[s,s==='All'?t2('All'):s])}/><div className="section-head"><h2>{results.length} {t2('concepts, made approachable')}</h2><span role="status">{widened?`${t2('No match in')} ${category}. ${t2('Showing every category.')}`:query?`${t2('Results for')} “${query}”`:t2('Plain language → technical detail → example')}</span></div>{results.length===0?<div className="end-panel card-glass"><BookOpen size={30} className="panel-icon"/><h2>{t2('No matching term.')}</h2><p className="muted">Try a shorter word or another category.</p><button className="btn secondary" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>:<div className="dictionary-grid">{results.map(t=><article className="definition-card card-glass lit" data-lit id={t.id} key={t.id}><span className="eyebrow">{t.category}</span><h2>{t.name}</h2>{t.aliases.length>0&&<span className="alias">{t2('Also')}: {t.aliases.slice(0,4).join(', ')}</span>}<p>{t.plain}</p><details><summary>{t2('The technical detail')}</summary><p>{t.technical}</p></details><div className="definition-example"><span className="eyebrow">{t2('For example')}</span><p>{t.example}</p></div><Link href={path(t)}>{t2('See it in action')} <ArrowUpRight size={14}/></Link></article>)}</div>}</>}
