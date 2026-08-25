import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PRO INGEMA S.A.C. | Ingeniería Geotécnica y Laboratorio de Materiales",
    template: "%s | PRO INGEMA S.A.C.",
  },
  description:
    "PRO INGEMA S.A.C. — Especialistas en estudios geotécnicos, mecánica de suelos, geología, estudios ambientales y laboratorio de materiales en Cusco, Perú, desde 2011.",
  keywords: [
    "geotecnia Cusco",
    "estudio de suelos Perú",
    "mecánica de suelos",
    "laboratorio de suelos",
    "laboratorio de concreto y asfalto",
    "estudios geológicos",
    "PRO INGEMA",
    "ensayo SPT",
    "control de calidad de obra",
  ],
  authors: [{ name: "PRO INGEMA S.A.C." }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "PRO INGEMA S.A.C.",
    title: "PRO INGEMA S.A.C. | Ingeniería Geotécnica y Laboratorio de Materiales",
    description:
      "Soluciones integrales de ingeniería geotécnica, estudios de suelos y laboratorio de materiales para proyectos seguros y sostenibles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
