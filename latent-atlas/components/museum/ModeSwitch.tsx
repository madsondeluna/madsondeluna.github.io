'use client';
import {useSyncExternalStore} from 'react';
import {Sun,BookOpen,Moon,Contrast} from 'lucide-react';
// o modo mora no localStorage com a mesma chave da raiz do site, entao
// abrir /latent-atlas a partir da home mantem o modo escolhido la
const MODES:[string,string,typeof Sun][]=[['','Light',Sun],['paper-like','Paper-like',BookOpen],['deep-blue','Deep blue',Moon],['dark','Dark',Contrast]];
function subscribe(cb:()=>void){const o=new MutationObserver(cb);o.observe(document.documentElement,{attributes:true,attributeFilter:['class']});return()=>o.disconnect()}
const read=()=>document.documentElement.className;
const server=()=>'dark';
function apply(m:string){document.documentElement.className=m;try{localStorage.setItem('mode',m||'light')}catch{}}
export default function ModeSwitch(){const mode=useSyncExternalStore(subscribe,read,server);return <div className="modes" role="group" aria-label="Colour mode">{MODES.map(([m,label,Icon])=><button key={label} type="button" className="mode-btn" aria-pressed={mode===m} onClick={()=>apply(m)}><Icon size={14}/>{label}</button>)}</div>}
