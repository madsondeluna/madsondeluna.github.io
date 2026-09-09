import type {Metadata} from 'next';
import {ComparePage} from '@/components/atlas/pages';
export const metadata:Metadata={title:'Side by side | Ghost in the Fold',description:'ESM-2 against ESM3 and ESM C, AlphaFold 2 against AlphaFold 3, ESMFold against ESMFold2.'};
export default function Page(){return <ComparePage/>}
