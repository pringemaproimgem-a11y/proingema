"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { GalleryLightbox } from "@/components/sections/GalleryLightbox";
import { cn } from "@/lib/utils";
import { GALLERY_CATEGORIES, type GalleryImage } from "@/lib/data/gallery";
import { getAdjacentGalleryIndex } from "@/lib/gallery-navigation";

type ResolvedGalleryImage = GalleryImage & { resolvedImage?: string };
type GalleryFilter = (typeof GALLERY_CATEGORIES)[number];

export function MasonryGallery({ images }: { images: ResolvedGalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryFilter>("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered =
    filter === "Todos" ? images : images.filter((image) => image.category === filter);
  const selectedIndex = filtered.findIndex((image) => image.id === selectedId);
  const selectedPhoto = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  const closeLightbox = useCallback(() => {
    setSelectedId(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const moveLightbox = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0) return;
      const nextIndex = getAdjacentGalleryIndex(
        selectedIndex,
        direction,
        filtered.length,
      );
      setSelectedId(filtered[nextIndex].id);
    },
    [filtered, selectedIndex],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3" aria-label="Filtrar galería">
        {GALLERY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => {
              setSelectedId(null);
              setFilter(category);
            }}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none",
              filter === category
                ? "border-brand-green bg-brand-green text-white"
                : "border-black/10 text-brand-dark/60 hover:border-brand-green/40 hover:text-brand-dark",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.ul
        layout
        className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, index) => (
            <motion.li
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
              className={cn(
                "min-w-0",
                photo.orientation === "portrait" && "sm:row-span-2",
              )}
            >
              <button
                type="button"
                aria-label={`Ampliar: ${photo.caption}`}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedId(photo.id);
                }}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-brand-dark text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <BrandImage
                  src={photo.resolvedImage}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={cn(
                    "w-full",
                    photo.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]",
                  )}
                  imageClassName="transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/55 to-transparent px-5 pb-5 pt-16 text-sm font-semibold leading-relaxed text-white">
                  {photo.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {selectedPhoto ? (
        <GalleryLightbox
          photo={selectedPhoto}
          currentIndex={selectedIndex}
          total={filtered.length}
          onClose={closeLightbox}
          onPrevious={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
        />
      ) : null}
    </div>
  );
}
