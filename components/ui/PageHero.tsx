import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark pb-20 pt-36 sm:pt-40">
      <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-green/20 blur-[100px]" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-orange/10 blur-[100px]" />
      <Container className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          {eyebrow}
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
