import type {Metadata} from 'next';
import {Catalogue} from '@/components/atlas/pages';
export const metadata:Metadata={title:'Model catalogue | Ghost in the Fold',description:'Protein language models, structure predictors and design models, each with its architecture, weights and sources.'};
export default function Page(){return <Catalogue/>}
