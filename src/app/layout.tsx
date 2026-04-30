import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Madson Aragão — Portfolio",
  description:
    "Madson A. de Luna Aragão is a Bioinformatician and Data Scientist with expertise in omics data analysis, machine learning and bioinformatics applied to structural biology.",
  keywords: [
    "bioinformatics", "machine learning", "deep learning", "genomics", "transcriptomics",
    "structural biology", "antimicrobial peptides", "protein design", "Nextflow", "Python",
  ],
  authors: [{ name: "Madson Allan de Luna Aragão" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
