export function getAdjacentGalleryIndex(
  current: number,
  direction: -1 | 1,
  total: number,
) {
  if (total < 1) {
    throw new Error("El visor requiere al menos una fotografía");
  }

  return (current + direction + total) % total;
}
