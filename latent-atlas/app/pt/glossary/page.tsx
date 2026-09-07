import type {Metadata} from 'next';
import Museum from '@/components/museum/Museum';
export const metadata:Metadata={title:'O dicionário | Proteínas num mundo de LLMs',description:'Sessenta e um termos com apelidos, categorias e exemplos.'};
export default function Page(){return <Museum slug="glossary" lang="pt"/>}
