import type { Metadata } from "next";
import { FlaskConical, Beaker, HardHat } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  SOIL_STANDARD_TESTS,
  SOIL_SPECIAL_TESTS,
  CONCRETE_ASPHALT_TESTS,
  type LabTest,
} from "@/lib/data/lab-tests";

export const metadata: Metadata = {
  title: "Laboratorio",
  description:
    "Laboratorio de suelos, concreto y asfalto de PRO INGEMA S.A.C.: ensayos estándar y especiales bajo normativa ASTM, NTP y MTC.",
};

function TestGrid({ tests }: { tests: LabTest[] }) {
  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2">
      {tests.map((test) => (
        <RevealItem key={test.name}>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-white px-5 py-4 shadow-[0_1px_8px_-2px_rgba(0,0,0,0.06)]">
            <span className="text-sm font-medium text-brand-dark">{test.name}</span>
            {test.norm ? (
              <span className="shrink-0 rounded-full bg-brand-green/10 px-2.5 py-1 text-[11px] font-semibold text-brand-green-dark">
                {test.norm}
              </span>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default function LaboratorioPage() {
  return (
    <>
      <PageHero
        eyebrow="Laboratorio"
        title="Laboratorio propio de suelos, concreto y asfalto"
        description="Infraestructura y equipos calibrados para ejecutar ensayos estándar y especiales bajo normativa ASTM, NTP y MTC, con resultados precisos y trazables."
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark">
                <FlaskConical className="h-3.5 w-3.5" />
                Laboratorio de Suelos
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
                Ensayos estándar
              </h2>
              <p className="mt-3 max-w-lg text-brand-dark/65">
                Caracterización física y mecánica básica del suelo, requerida en todo
                estudio de mecánica de suelos con fines de cimentación o pavimentación.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <TestGrid tests={SOIL_STANDARD_TESTS} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f8f7] py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <TestGrid tests={SOIL_SPECIAL_TESTS} />
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
                <Beaker className="h-3.5 w-3.5" />
                Laboratorio de Suelos
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
                Ensayos especiales
              </h2>
              <p className="mt-3 max-w-lg text-brand-dark/65">
                Ensayos avanzados para proyectos que requieren un análisis geotécnico
                más profundo: comportamiento esfuerzo-deformación, consolidación y
                resistencia al corte del suelo.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark">
                <HardHat className="h-3.5 w-3.5" />
                Materiales
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
                Laboratorio de concreto y asfalto
              </h2>
              <p className="mt-3 max-w-lg text-brand-dark/65">
                Control de calidad de materiales para obras viales y de edificación,
                desde el diseño de mezcla hasta la evaluación estructural del pavimento.
              </p>
              <div className="mt-8">
                <BrandImage
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
                  alt="Control de calidad de materiales en obra"
                  className="aspect-video w-full rounded-2xl"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <TestGrid tests={CONCRETE_ASPHALT_TESTS} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
