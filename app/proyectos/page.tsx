import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FieldPhotoSelection } from "@/components/sections/FieldPhotoSelection";
import { CTABanner } from "@/components/sections/CTABanner";
import { PROJECTS } from "@/lib/data/projects";
import { getFieldPhotosByPlacement } from "@/lib/data/gallery";
import { resolveImage } from "@/lib/resolve-image";

const RECENT_FIELD_PHOTOS = getFieldPhotosByPlacement("projects");

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos de PRO INGEMA S.A.C.: obras públicas, obras privadas, estudios geotécnicos y ensayos de laboratorio ejecutados en el sur del Perú.",
};

export default function ProyectosPage() {
  const projects = PROJECTS.map((project) => ({
    ...project,
    resolvedImage: resolveImage(project.image),
  }));

  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title="Un portafolio que respalda nuestra experiencia"
        description="Estudios y obras ejecutados para entidades públicas y privadas, con enfoque técnico y compromiso con la calidad."
      />

      <section className="bg-white py-24">
        <Container>
          <ProjectsGrid projects={projects} />
        </Container>
      </section>

      <section className="bg-[#f7f8f7] py-24">
        <Container>
          <SectionHeading
            eyebrow="Evidencia técnica"
            title="Trabajos recientes en campo"
            description="Exploración, medición y control de calidad realizados por nuestro equipo en distintos contextos de obra."
          />
          <FieldPhotoSelection
            photos={RECENT_FIELD_PHOTOS}
            label="Selección de trabajos recientes de PRO INGEMA"
          />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
