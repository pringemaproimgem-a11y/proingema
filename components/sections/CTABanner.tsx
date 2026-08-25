import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-green-dark py-20">
      <div className="absolute inset-0 bg-blueprint-grid opacity-20" />
      <Container className="relative">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Tienes un proyecto de ingeniería en marcha?
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Conversemos sobre tus requerimientos técnicos. Nuestro equipo
              está listo para brindarte una propuesta a tu medida.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contacto" variant="light" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Solicitar Cotización
            </Button>
            <Button
              href={`tel:${COMPANY.phoneHref}`}
              variant="outline"
              size="lg"
              icon={<PhoneCall className="h-4 w-4" />}
            >
              {COMPANY.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
