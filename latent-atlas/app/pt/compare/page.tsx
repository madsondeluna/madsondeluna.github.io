import type {Metadata} from 'next';
import {ComparePage} from '@/components/atlas/pages';
export const metadata:Metadata={title:'Lado a lado | Proteínas num mundo de LLMs',description:'ESM-2 contra ESM3 e ESM C, AlphaFold 2 contra AlphaFold 3, ESMFold contra ESMFold2.'};
export default function Page(){return <ComparePage lang="pt"/>}
