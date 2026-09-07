import Museum from '@/components/museum/Museum';
import {exhibits} from '@/lib/museum/content';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return exhibits.filter(e=>e.slug!=='map').map(e=>({slug:e.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!exhibits.some(e=>e.slug===slug))notFound();return <Museum slug={slug}/>}
