import type {Metadata} from 'next';
import Museum from '@/components/museum/Museum';
export const metadata:Metadata={title:'Ghost in the Fold',description:'Modelos de linguagem de proteínas e predição de estrutura, do resíduo mascarado ao decodificador de difusão de todos os átomos.'};
export default function Page(){return <Museum slug="map" lang="pt"/>}
