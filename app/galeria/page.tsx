import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { MasonryGallery } from "@/components/sections/MasonryGallery";
import { CTABanner } from "@/components/sections/CTABanner";
import { GALLERY_IMAGES } from "@/lib/data/gallery";
import { resolveImage } from "@/lib/resolve-image";

export const metadata: Metadata = {
  title: "Galería de trabajos de campo",
  description:
    "Galería fotográfica de PRO INGEMA S.A.C.: calicatas, estudios de suelos, densidad de campo y control técnico en obras viales.",
};

export default function GaleriaPage() {
  const images = GALLERY_IMAGES.map((image) => ({
    ...image,
    resolvedImage: resolveImage(image.image),
  }));

  return (
    <>
      <PageHero
        eyebrow="Galería"
        title="Nuestro trabajo real en imágenes"
        description="Exploración geotécnica, calicatas y control de densidad ejecutados por nuestro equipo en diferentes contextos de obra."
      />

      <section className="bg-white py-24">
        <Container>
          <MasonryGallery images={images} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
