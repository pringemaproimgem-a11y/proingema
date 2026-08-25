import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { SERVICES } from "@/lib/data/services";
import { resolveImage } from "@/lib/resolve-image";

export function ServicesPreview() {
  return (
    <section className="bg-[#f7f8f7] py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Lo que hacemos"
            title="Servicios de ingeniería especializados"
            description="Catálogo integral que cubre todo el ciclo de un proyecto: desde la exploración de campo hasta el control de calidad de materiales."
          />
          <Link
            href="/servicios"
            className="mb-2 hidden items-center gap-1.5 text-sm font-semibold text-brand-green-dark hover:text-brand-dark sm:flex"
          >
            Ver todos los servicios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <RevealItem key={service.slug}>
              <Link
                href="/servicios"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]"
              >
                <BrandImage
                  src={resolveImage(service.image)}
                  alt={service.title}
                  icon={service.icon}
                  className="h-44 w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-brand-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-dark/60">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-dark">
                    Conocer más
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-dark"
          >
            Ver todos los servicios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
