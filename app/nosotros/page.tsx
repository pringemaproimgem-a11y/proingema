import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, ShieldCheck, Lightbulb, Award, Building2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { CTABanner } from "@/components/sections/CTABanner";
import { COMPANY } from "@/lib/constants";
import { TEAM } from "@/lib/data/team";
import { resolveImage } from "@/lib/resolve-image";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión, visión, valores y equipo profesional de PRO INGEMA S.A.C., empresa cusqueña de ingeniería geotécnica fundada en 2011.",
};

const VALUES = [
  { icon: HeartHandshake, title: "Compromiso", description: "Con nuestros clientes, sus plazos y la calidad de cada informe técnico." },
  { icon: Award, title: "Calidad", description: "Procesos y ensayos ejecutados bajo normativa técnica vigente." },
  { icon: ShieldCheck, title: "Seguridad", description: "Protocolos de seguridad en campo y laboratorio en cada proyecto." },
  { icon: Lightbulb, title: "Innovación", description: "Actualización constante en métodos, equipos y tecnología." },
  { icon: Building2, title: "Responsabilidad", description: "Con el entorno, la sociedad y el desarrollo sostenible del país." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Ingeniería con identidad cusqueña, estándares nacionales"
        description="Más de una década construyendo confianza a través de la precisión técnica y el compromiso con cada proyecto."
      />

      <section className="bg-white py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Nuestra Historia"
              title="Una empresa forjada por ingenieros cusqueños"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-dark/70">
              <p>
                <strong className="text-brand-dark">{COMPANY.legalName}</strong> ({COMPANY.fullName})
                fue creada el {COMPANY.foundedDate} por jóvenes ingenieros cusqueños con el
                objetivo de competir en el mercado nacional de consultoría y construcción.
              </p>
              <p>
                Desde entonces, hemos consolidado un equipo técnico especializado en geotecnia,
                mecánica de suelos, geología, estudios ambientales y laboratorio de materiales,
                atendiendo proyectos de entidades públicas y privadas en distintas regiones del Perú.
              </p>
              <p>
                Hoy, {COMPANY.shortName} es sinónimo de rigor técnico y confiabilidad para
                proyectos de infraestructura de alta exigencia, respaldados por más de{" "}
                {new Date().getFullYear() - COMPANY.foundedYear} años de trayectoria continua.
              </p>
            </div>
          </div>
          <Reveal>
            <BrandImage
              src="https://images.unsplash.com/photo-1541976590-713941681591?w=1200&q=80"
              alt="Sede e instalaciones de PRO INGEMA"
              className="aspect-[4/3] w-full rounded-2xl"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f7f8f7] py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="group relative overflow-hidden rounded-2xl bg-brand-dark p-10 text-white">
              <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
              <Target className="relative h-10 w-10 text-brand-green" strokeWidth={1.5} />
              <h3 className="relative mt-6 font-display text-2xl font-semibold">Misión</h3>
              <p className="relative mt-4 leading-relaxed text-white/70">
                Brindar servicios de ingeniería geotécnica, estudios de suelos y laboratorio de
                materiales con altos estándares de calidad, seguridad y rigor técnico,
                contribuyendo al desarrollo seguro y sostenible de la infraestructura del país.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="group relative overflow-hidden rounded-2xl bg-brand-green p-10 text-white">
              <div className="absolute inset-0 bg-blueprint-grid opacity-20" />
              <Eye className="relative h-10 w-10 text-white" strokeWidth={1.5} />
              <h3 className="relative mt-6 font-display text-2xl font-semibold">Visión</h3>
              <p className="relative mt-4 leading-relaxed text-white/90">
                Ser reconocidos como una de las empresas de consultoría en ingeniería geotécnica
                más confiables del sur del Perú, expandiendo nuestra cobertura nacional a través de
                la innovación tecnológica y la excelencia profesional.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Lo Que Nos Define"
            title="Nuestros valores"
            align="center"
            className="mx-auto"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value) => (
              <RevealItem key={value.title}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-black/5 p-6 text-center transition-colors hover:border-brand-green/40 hover:bg-brand-green/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green-dark">
                    <value.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h4 className="mt-4 font-display text-base font-semibold text-brand-dark">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
                    {value.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-[#f7f8f7] py-24">
        <Container>
          <SectionHeading eyebrow="Nuestro Equipo" title="Equipo profesional" />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {TEAM.map((member) => (
              <Reveal key={member.name} className="lg:col-span-1">
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]">
                  <BrandImage
                    src={resolveImage(member.image)}
                    alt={member.name}
                    icon="hard-hat"
                    className="aspect-[4/3] w-full"
                  />
                  <div className="p-7">
                    <h3 className="font-display text-lg font-semibold text-brand-dark">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-green-dark">
                      {member.role} — {member.cip}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
                      Especialista en
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green-dark"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.15} className="flex flex-col justify-center rounded-2xl border border-dashed border-brand-dark/15 p-8 lg:col-span-2">
              <p className="font-display text-xl font-semibold text-brand-dark">
                Un equipo multidisciplinario respalda cada proyecto
              </p>
              <p className="mt-3 leading-relaxed text-brand-dark/65">
                Además de nuestra gerencia general, contamos con ingenieros de campo,
                técnicos de laboratorio y personal de apoyo especializado en mecánica de
                suelos, geología, cimentaciones, carreteras y canteras, garantizando
                cobertura técnica en cada etapa del proyecto.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
