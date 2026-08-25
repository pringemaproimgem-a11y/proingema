import { createElement } from "react";
import { getImageProps } from "next/image.js";
import type { Client } from "@/lib/data/clients";

export function ClientLogo({ client }: { client: Client }) {
  const { props } = getImageProps({
    src: client.logo,
    alt: client.logoAlt,
    width: client.logoWidth,
    height: client.logoHeight,
    sizes: "(min-width: 640px) 172px, 140px",
    loading: "lazy",
    className: "h-16 w-full object-contain sm:h-20",
  });

  return createElement("img", props);
}
