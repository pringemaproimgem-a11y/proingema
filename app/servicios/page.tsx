import type { Metadata } from "next";
import { CheckCircle2, Target } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { CTABanner } from "@/components/sections/CTABanner";
import { SERVICES } from "@/lib/data/services";
import { resolveImage } from "@/lib/resolve-image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Catálogo de servicios de ingeniería de PRO INGEMA S.A.C.: estudios geotécnicos, mecánica de suelos, estudios geológicos, ambientales y laboratorio de suelos, concreto y asfalto.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Catálogo integral de ingeniería geotécnica"
        description="Acompañamos cada etapa de tu proyecto: exploración de campo, ensayos de laboratorio, estudios especializados y control de calidad de materiales."
      />

      <section className="bg-white py-24">
        <Container className="space-y-20">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug}>
              <div
                id={service.slug}
                className={cn(
                  "grid items-center gap-12 scroll-mt-28 lg:grid-cols-2",
                )}
              >
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <BrandImage
                    src={resolveImage(service.image)}
                    alt={service.title}
                    icon={service.icon}
                    className="aspect-[4/3] w-full rounded-2xl"
                  />
                </div>
                <div className={cn(index % 2 === 1 && "lg:order-1")}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark">
                    Servicio {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-brand-dark/70">
                    {service.description}
                  </p>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-dark/50">
                        <CheckCircle2 className="h-4 w-4 text-brand-green" />
                        Beneficios
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="text-sm leading-relaxed text-brand-dark/70">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-dark/50">
                        <Target className="h-4 w-4 text-brand-orange" />
                        Aplicaciones
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.applications.map((a) => (
                          <li key={a} className="text-sm leading-relaxed text-brand-dark/70">
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
