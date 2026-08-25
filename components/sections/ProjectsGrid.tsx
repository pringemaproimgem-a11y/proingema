"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES, type Project } from "@/lib/data/projects";

type ResolvedProject = Project & { resolvedImage?: string };

export function ProjectsGrid({ projects }: { projects: ResolvedProject[] }) {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>("Todos");

  const filtered =
    filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
              filter === cat
                ? "border-brand-green bg-brand-green text-white"
                : "border-black/10 text-brand-dark/60 hover:border-brand-green/40 hover:text-brand-dark",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]"
            >
              <BrandImage
                src={project.resolvedImage}
                alt={project.name}
                icon="compass"
                className="aspect-[4/3] w-full"
              />
              <div className="p-6">
                <span className="rounded-full bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-green-dark">
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-brand-dark">
                  {project.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-brand-dark/50">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/65">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
