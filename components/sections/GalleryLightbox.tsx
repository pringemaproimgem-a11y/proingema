"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import type { GalleryImage } from "@/lib/data/gallery";

type GalleryLightboxProps = {
  photo: GalleryImage;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  photo,
  currentIndex,
  total,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografía ampliada: ${photo.caption}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3 text-white">
          <span className="text-xs font-semibold tabular-nums tracking-wide text-white/60">
            {currentIndex + 1} / {total}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar fotografía"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black/30">
          <BrandImage
            src={photo.image}
            alt={photo.alt}
            sizes="100vw"
            className="absolute inset-0"
            imageClassName="object-contain"
          />

          <button
            type="button"
            onClick={onPrevious}
            aria-label="Fotografía anterior"
            className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-dark/70 text-white transition-colors hover:bg-white hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none sm:left-5"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Fotografía siguiente"
            className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-dark/70 text-white transition-colors hover:bg-white hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none sm:right-5"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <p className="mx-auto max-w-3xl px-4 pt-4 text-center text-sm leading-relaxed text-white/80 sm:text-base">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}
