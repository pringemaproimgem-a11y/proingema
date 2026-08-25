import fs from "node:fs";
import path from "node:path";

/**
 * Resolves an image reference to a usable `src` for BrandImage.
 * - Remote (http) URLs are returned as-is.
 * - Local `/images/...` paths are only returned if the file actually exists
 *   under `public/`, so the site shows a branded placeholder until a real
 *   photo is dropped into `public/images/...` (see public/images/README.md).
 */
export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith("http")) return src;

  const filePath = path.join(process.cwd(), "public", src);
  return fs.existsSync(filePath) ? src : undefined;
}
