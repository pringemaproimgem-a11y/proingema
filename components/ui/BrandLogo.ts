import { createElement } from "react";
import { getImageProps } from "next/image.js";

export type BrandLogoPlacement = "navbar" | "footer";

const PLACEMENT_PROPS = {
  navbar: {
    className: "h-16 w-auto object-contain sm:h-20",
    sizes: "(min-width: 640px) 71px, 57px",
    loading: "eager",
    fetchPriority: "high",
  },
  footer: {
    className: "h-32 w-auto object-contain",
    sizes: "128px",
    loading: "lazy",
    fetchPriority: "auto",
  },
} as const;

export function BrandLogo({ placement }: { placement: BrandLogoPlacement }) {
  const placementProps = PLACEMENT_PROPS[placement];
  const { props } = getImageProps({
    src: "/images/pro-ingema/logo-pro-ingema.png",
    alt: "Logotipo oficial de PRO INGEMA S.A.C.",
    width: 1182,
    height: 1331,
    sizes: placementProps.sizes,
    loading: placementProps.loading,
    fetchPriority: placementProps.fetchPriority,
    className: placementProps.className,
  });

  return createElement("img", props);
}
