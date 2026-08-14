import { BrandImage } from "@/components/ui/BrandImage";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/data/gallery";

type FieldPhotoSelectionProps = {
  photos: GalleryImage[];
  label: string;
};

export function FieldPhotoSelection({ photos, label }: FieldPhotoSelectionProps) {
  return (
    <ul
      aria-label={label}
      className="mt-10 grid list-none gap-5 p-0 md:grid-cols-2"
    >
      {photos.map((photo, index) => {
        const leadsGrid = index === 0 && photo.orientation === "landscape";

        return (
          <li key={photo.id} className={cn("min-w-0", leadsGrid && "md:col-span-2")}>
            <figure className="group h-full overflow-hidden rounded-2xl bg-brand-dark">
              <BrandImage
                src={photo.image}
                alt={photo.alt}
                sizes={
                  leadsGrid
                    ? "(min-width: 1024px) 1200px, 100vw"
                    : "(min-width: 1024px) 50vw, 100vw"
                }
                className={cn(
                  "w-full",
                  leadsGrid
                    ? "aspect-[16/9]"
                    : photo.orientation === "portrait"
                      ? "aspect-[4/5]"
                      : "aspect-[4/3]",
                )}
              />
              <figcaption className="px-5 py-4 text-sm font-medium leading-relaxed text-white/85">
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
