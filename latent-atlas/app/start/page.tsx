import type {Metadata} from 'next';
import {RoutesPage} from '@/components/atlas/pages';
export const metadata:Metadata={title:'Where to start | Proteins in a World of LLMs',description:'Three guided routes through protein language models, structure prediction and design.'};
export default function Page(){return <RoutesPage/>}
