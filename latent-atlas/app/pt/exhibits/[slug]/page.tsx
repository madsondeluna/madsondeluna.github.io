import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Museum from '@/components/museum/Museum';
import {exhibits} from '@/lib/museum/content';
import {exhibitFor} from '@/lib/museum/i18n';
export function generateStaticParams(){return exhibits.filter(e=>e.slug!=='map').map(e=>({slug:e.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const e=exhibitFor(slug,'pt');
  return e?{title:`${e.title} | Proteínas num mundo de LLMs`,description:e.description}:{};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(!exhibits.some(e=>e.slug===slug))notFound();
  return <Museum slug={slug} lang="pt"/>;
}
