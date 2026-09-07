import type {Metadata} from 'next';
import {Catalogue} from '@/components/atlas/pages';
export const metadata:Metadata={title:'Catálogo de modelos | Proteínas num mundo de LLMs',description:'Modelos de linguagem de proteínas, preditores de estrutura e modelos de design, cada um com arquitetura, pesos e fontes.'};
export default function Page(){return <Catalogue lang="pt"/>}
