import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { CTABanner } from "@/components/sections/CTABanner";
import { CLIENTS } from "@/lib/data/clients";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Instituciones públicas y privadas que confían en PRO INGEMA S.A.C.: Gobierno Regional Cusco, Plan COPESCO, Provías Descentralizado, Ministerio de Vivienda y más.",
};

export default function ClientesPage() {
  return (
    <>
      <PageHero
        eyebrow="Clientes"
        title="Instituciones que confían en nuestro trabajo"
        description="Hemos brindado servicios de ingeniería a entidades públicas y privadas, consolidando una trayectoria de confianza técnica."
      />

      <section className="bg-brand-dark py-14">
        <ClientsMarquee />
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Nuestros Clientes"
            title="Entidades y proyectos que respaldan nuestra experiencia"
            align="center"
            className="mx-auto"
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CLIENTS.map((client) => (
              <RevealItem key={client.name}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-black/5 p-7 text-center transition-all hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.12)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green-dark">
                    <Building2 className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 font-display text-sm font-semibold leading-snug text-brand-dark">
                    {client.name}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
