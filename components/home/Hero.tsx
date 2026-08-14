"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { getFieldPhotosByPlacement } from "@/lib/data/gallery";

const HOME_HERO_PHOTO = getFieldPhotosByPlacement("home-hero")[0];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 4),
  duration: 6 + (i % 5),
  delay: (i % 6) * 0.6,
}));

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-dark pt-36 sm:pt-40">
      <BrandImage
        src={HOME_HERO_PHOTO.image}
        alt={HOME_HERO_PHOTO.alt}
        priority
        sizes="100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/85 to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-blueprint-grid opacity-40" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-brand-green/70"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="pointer-events-none absolute inset-6 sm:inset-10"
      >
        <span className="absolute left-0 top-0 h-9 w-9 border-l-2 border-t-2 border-brand-green/50" />
        <span className="absolute right-0 top-0 h-9 w-9 border-r-2 border-t-2 border-brand-green/50" />
        <span className="absolute bottom-0 left-0 h-9 w-9 border-b-2 border-l-2 border-brand-green/50" />
        <span className="absolute bottom-0 right-0 h-9 w-9 border-b-2 border-r-2 border-brand-green/50" />
      </motion.div>

      <Container className="relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green"
          >
            <Compass className="h-3.5 w-3.5" />
            Ingeniería Geotécnica desde 2011
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
          >
            Soluciones integrales de{" "}
            <span className="text-brand-green">ingeniería geotécnica</span>{" "}
            para proyectos seguros y sostenibles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Especialistas en estudios de suelos, geología, laboratorio de
            materiales y consultoría de ingeniería con experiencia desde 2011.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              href="/contacto"
              size="lg"
              icon={
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
            >
              Solicitar Cotización
            </Button>
            <Button href="/servicios" variant="outline" size="lg">
              Ver Servicios
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
