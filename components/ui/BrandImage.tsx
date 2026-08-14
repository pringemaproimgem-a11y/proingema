import Image from "next/image";
import {
  Layers,
  FlaskConical,
  Mountain,
  HardHat,
  Microscope,
  Compass,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  flask: FlaskConical,
  mountain: Mountain,
  "hard-hat": HardHat,
  microscope: Microscope,
  compass: Compass,
  leaf: Leaf,
};

type BrandImageProps = {
  src?: string;
  alt: string;
  icon?: keyof typeof ICONS;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders a real photo via next/image when `src` is provided (already
 * resolved with `resolveImage()` by the caller), otherwise falls back to a
 * branded blueprint-style placeholder panel so every image slot in the site
 * looks intentional while real photography from public/images is pending
 * (see public/images/README.md).
 */
export function BrandImage({
  src,
  alt,
  icon = "compass",
  label,
  className,
  imageClassName,
  priority,
  sizes,
}: BrandImageProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  const Icon = ICONS[icon];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-brand-dark text-brand-white",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-green-dark/40" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-green/20 blur-2xl" />
      <Icon
        className="relative z-10 h-10 w-10 text-brand-green sm:h-12 sm:w-12"
        strokeWidth={1.5}
      />
      {label ? (
        <span className="relative z-10 mt-3 max-w-[85%] text-center text-xs font-medium tracking-wide text-white/60">
          {label}
        </span>
      ) : null}
    </div>
  );
}
