import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { getFieldPhotosByPlacement } from "@/lib/data/gallery";

const HOME_ABOUT_PHOTO = getFieldPhotosByPlacement("home-about")[0];

const POINTS = [
  "Fundada en 2011 por jóvenes ingenieros cusqueños",
  "Equipo profesional colegiado y habilitado",
  "Laboratorio propio con equipos calibrados",
  "Cobertura de proyectos públicos y privados a nivel nacional",
];

export function AboutTeaser() {
  return (
    <section className="bg-white py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <BrandImage
              src={HOME_ABOUT_PHOTO.image}
              alt={HOME_ABOUT_PHOTO.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brand-green p-6 text-white shadow-xl sm:block">
              <p className="font-display text-3xl font-bold">2011</p>
              <p className="text-xs font-medium uppercase tracking-wide text-white/85">
                Año de fundación
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Quiénes Somos"
            title="Ingeniería con raíces cusqueñas y visión nacional"
            description="PRO INGEMA S.A.C. fue creada el 11 de abril de 2011 por jóvenes ingenieros cusqueños con el objetivo de competir en el mercado nacional de consultoría y construcción, ofreciendo soluciones técnicas confiables para proyectos de infraestructura."
          />

          <ul className="mt-8 space-y-3.5">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-brand-dark/75 sm:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/nosotros" variant="ghost" className="px-0!">
              Conoce nuestra historia completa →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
