import type { Metadata } from "next";
import { CvPage } from "@/components/cv-page";
import { CV } from "@/lib/cv";

const LANGS = {
  "en-US": "https://madsondeluna.com/",
  "pt-BR": "https://madsondeluna.com/pt",
  es: "https://madsondeluna.com/es",
  "x-default": "https://madsondeluna.com/",
};

export const metadata: Metadata = {
  title: CV.es.title,
  description: CV.es.description,
  alternates: { canonical: "https://madsondeluna.com/es", languages: LANGS },
  openGraph: {
    type: "profile",
    url: "https://madsondeluna.com/es",
    title: CV.es.title,
    description: CV.es.description,
  },
};

export default function Page() {
  return <CvPage locale="es" />;
}
