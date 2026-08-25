import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 10, suffix: "+", label: "Años de experiencia" },
  { value: 50, suffix: "+", label: "Proyectos ejecutados" },
  { value: 8, suffix: "+", label: "Instituciones públicas" },
  { value: 15, suffix: "+", label: "Servicios especializados" },
];

export function Counters() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-20">
      <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-brand-green/10 blur-[120px]" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/55">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
