import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

test("la navegación del visor avanza y retrocede de forma circular", async () => {
  const helperPath = path.join(process.cwd(), "lib", "gallery-navigation.ts");
  assert.ok(existsSync(helperPath), "Falta gallery-navigation.ts");

  const helper = await import(pathToFileURL(helperPath).href);
  const getAdjacentGalleryIndex = Reflect.get(helper, "getAdjacentGalleryIndex");
  assert.equal(typeof getAdjacentGalleryIndex, "function");

  assert.equal(getAdjacentGalleryIndex(0, 1, 25), 1);
  assert.equal(getAdjacentGalleryIndex(24, 1, 25), 0);
  assert.equal(getAdjacentGalleryIndex(0, -1, 25), 24);
  assert.equal(getAdjacentGalleryIndex(12, -1, 25), 11);
  assert.throws(
    () => getAdjacentGalleryIndex(0, 1, 0),
    /al menos una fotografía/,
  );
});

test("el visor y las miniaturas exponen controles accesibles", () => {
  const lightboxPath = path.join(
    process.cwd(),
    "components",
    "sections",
    "GalleryLightbox.tsx",
  );
  const masonryPath = path.join(
    process.cwd(),
    "components",
    "sections",
    "MasonryGallery.tsx",
  );
  assert.ok(existsSync(lightboxPath), "Falta GalleryLightbox.tsx");

  const lightboxSource = readFileSync(lightboxPath, "utf8");
  const masonrySource = readFileSync(masonryPath, "utf8");

  for (const token of [
    'role="dialog"',
    "aria-modal",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "Cerrar fotografía",
    "Fotografía anterior",
    "Fotografía siguiente",
  ]) {
    assert.ok(lightboxSource.includes(token), `Falta ${token} en el visor`);
  }
  assert.ok(masonrySource.includes("Ampliar:"));
  assert.ok(masonrySource.includes('type="button"'));
  assert.ok(masonrySource.includes("getAdjacentGalleryIndex"));
});

test("la página de galería presenta el archivo fotográfico real", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app", "galeria", "page.tsx"),
    "utf8",
  );

  assert.ok(source.includes("Galería de trabajos de campo"));
  assert.ok(source.includes("Nuestro trabajo real en imágenes"));
  assert.ok(source.includes("calicatas, estudios de suelos, densidad de campo"));
});
