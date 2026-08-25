import { Award, FlaskConical, ShieldCheck, MapPinned } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const REASONS = [
  {
    icon: Award,
    title: "Más de 10 años de experiencia",
    description:
      "Desde 2011 ejecutando estudios y proyectos de ingeniería geotécnica en el sur del Perú.",
  },
  {
    icon: FlaskConical,
    title: "Laboratorio especializado",
    description:
      "Laboratorio propio de suelos, concreto y asfalto equipado para ensayos estándar y especiales.",
  },
  {
    icon: ShieldCheck,
    title: "Profesionales certificados",
    description:
      "Equipo de ingenieros colegiados y habilitados, comprometidos con la calidad y la seguridad.",
  },
  {
    icon: MapPinned,
    title: "Experiencia nacional",
    description:
      "Proyectos ejecutados para entidades públicas y privadas en distintas regiones del país.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Nuestra Ventaja"
          title="¿Por qué elegirnos?"
          description="Combinamos experiencia técnica, tecnología y rigor normativo para entregar resultados confiables en cada proyecto."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-7 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-brand-green/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green-dark transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <reason.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold text-brand-dark">
                  {reason.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-brand-dark/60">
                  {reason.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
