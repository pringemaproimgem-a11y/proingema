import type { Metadata } from "next";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { CTABanner } from "@/components/sections/CTABanner";
import { BLOG_POSTS } from "@/lib/data/blog";
import { resolveImage } from "@/lib/resolve-image";

export const metadata: Metadata = {
  title: "Noticias y Blog Técnico",
  description:
    "Artículos técnicos, novedades normativas y noticias empresariales de PRO INGEMA S.A.C. sobre ingeniería geotécnica, suelos y laboratorio de materiales.",
};

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & Noticias"
        title="Contenido técnico y novedades de PRO INGEMA"
        description="Artículos técnicos, avances normativos, nuevos proyectos e innovaciones en ingeniería geotécnica."
      />

      <section className="bg-white py-24">
        <Container>
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <RevealItem key={post.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                  <BrandImage
                    src={resolveImage(post.image)}
                    alt={post.title}
                    icon="microscope"
                    className="aspect-[16/10] w-full"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-orange-dark">
                      {post.category}
                    </span>
                    <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-brand-dark">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-dark/60">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-medium text-brand-dark/45">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {dateFormatter.format(new Date(post.date))}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-dark">
                      Leer artículo
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
