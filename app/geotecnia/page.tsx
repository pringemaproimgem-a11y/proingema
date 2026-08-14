import type { Metadata } from "next";
import { Target, Wrench, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { CTABanner } from "@/components/sections/CTABanner";
import { FieldPhotoSelection } from "@/components/sections/FieldPhotoSelection";
import { FIELD_TESTS } from "@/lib/data/field-tests";
import { getFieldPhotosByPlacement } from "@/lib/data/gallery";
import { resolveImage } from "@/lib/resolve-image";
import { cn } from "@/lib/utils";

const GEOTECHNICAL_PHOTOS = getFieldPhotosByPlacement("geotechnics");

export const metadata: Metadata = {
  title: "Geotecnia",
  description:
    "Ensayos de campo geotécnicos ejecutados por PRO INGEMA S.A.C.: cono de arena, DPL, SPT, CBR de campo, perfil estratigráfico y humedad Speedy.",
};

export default function GeotecniaPage() {
  return (
    <>
      <PageHero
        eyebrow="Geotecnia"
        title="Ensayos de campo con rigor técnico"
        description="La exploración geotécnica in situ es la base de todo estudio confiable. Ejecutamos ensayos normados con equipos calibrados y personal especializado."
      />

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Exploración In Situ"
            title="Ensayos de campo geotécnicos"
            description="Cada ensayo responde a una necesidad específica del proyecto: caracterizar el terreno, verificar compactación o estimar capacidad de soporte."
          />

          <div className="mt-14 space-y-6">
            {FIELD_TESTS.map((test, index) => (
              <Reveal key={test.slug}>
                <div className="grid gap-0 overflow-hidden rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] lg:grid-cols-[280px_1fr]">
                  <BrandImage
                    src={resolveImage(`/images/geotecnia/${test.slug}.jpg`)}
                    alt={test.name}
                    icon="compass"
                    label={test.norm}
                    className={cn("h-48 w-full lg:h-full")}
                  />
                  <div className="p-7 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark font-display text-xs font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-brand-dark">
                        {test.name}
                      </h3>
                      <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green-dark">
                        {test.norm}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-3">
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
                          <Target className="h-3.5 w-3.5 text-brand-green" />
                          Objetivo
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">
                          {test.objective}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
                          <Wrench className="h-3.5 w-3.5 text-brand-orange" />
                          Aplicación
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">
                          {test.application}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
                          <AlertCircle className="h-3.5 w-3.5 text-brand-dark" />
                          Importancia
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">
                          {test.importance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 border-t border-black/5 pt-20">
            <SectionHeading
              eyebrow="Experiencia en campo"
              title="Trabajo geotécnico en condiciones reales"
              description="Calicatas, reconocimiento del terreno y registro técnico ejecutados en entornos urbanos y rurales."
            />
            <FieldPhotoSelection
              photos={GEOTECHNICAL_PHOTOS}
              label="Selección de trabajos geotécnicos en campo"
            />
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
