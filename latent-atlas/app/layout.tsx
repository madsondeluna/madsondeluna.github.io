import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proteins in a World of LLMs",
  description: "Protein language models and structure prediction, from a masked residue to an all-atom diffusion decoder. Architectures you can click through, and every claim traced to its source.",
  icons: {
    icon: "/latent-atlas/favicon.svg",
    shortcut: "/latent-atlas/favicon.svg",
  },
};

// le o modo antes da primeira pintura; a chave e a mesma da raiz do site
const MODE_BOOT=`try{var m=localStorage.getItem("mode");if(m===null)m="dark";document.documentElement.className=m==="light"?"":m}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- layout raiz do app router: carrega para todas as rotas */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,300..400&family=Public+Sans:wght@300;400;500;600&family=Spline+Sans+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html:MODE_BOOT}} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
