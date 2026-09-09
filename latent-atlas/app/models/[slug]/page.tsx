import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ModelPage} from '@/components/atlas/pages';
import {models,findModel} from '@/lib/atlas/models';
export function generateStaticParams(){return models.map(m=>({slug:m.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const m=findModel(slug);
  return m?{title:`${m.name} | Ghost in the Fold`,description:m.tagline}:{};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(!findModel(slug))notFound();
  return <ModelPage slug={slug}/>;
}
