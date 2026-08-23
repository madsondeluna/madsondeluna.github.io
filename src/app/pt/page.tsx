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
  title: CV.pt.title,
  description: CV.pt.description,
  alternates: { canonical: "https://madsondeluna.com/pt", languages: LANGS },
  openGraph: {
    type: "profile",
    url: "https://madsondeluna.com/pt",
    title: CV.pt.title,
    description: CV.pt.description,
  },
};

export default function Page() {
  return <CvPage locale="pt" />;
}
