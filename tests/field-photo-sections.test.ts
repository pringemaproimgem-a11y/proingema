import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const componentPath = path.join(
  process.cwd(),
  "components",
  "sections",
  "FieldPhotoSelection.tsx",
);

test("la selección editorial usa fotografías, pies descriptivos y una lista semántica", () => {
  assert.ok(existsSync(componentPath), "Falta FieldPhotoSelection.tsx");

  const source = readFileSync(componentPath, "utf8");
  for (const token of [
    "GalleryImage[]",
    "aria-label={label}",
    "<figure",
    "photo.image",
    "photo.alt",
    "photo.caption",
    "BrandImage",
  ]) {
    assert.ok(source.includes(token), `Falta ${token} en FieldPhotoSelection`);
  }
});

test("Geotecnia muestra la selección técnica sin alterar las fichas de ensayos", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app", "geotecnia", "page.tsx"),
    "utf8",
  );

  assert.ok(source.includes('getFieldPhotosByPlacement("geotechnics")'));
  assert.ok(source.includes("Trabajo geotécnico en condiciones reales"));
  assert.ok(source.includes("FieldPhotoSelection"));
  assert.ok(source.includes("FIELD_TESTS.map"));
});

test("Proyectos añade evidencia reciente sin modificar su portafolio", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app", "proyectos", "page.tsx"),
    "utf8",
  );

  assert.ok(source.includes('getFieldPhotosByPlacement("projects")'));
  assert.ok(source.includes("Trabajos recientes en campo"));
  assert.ok(source.includes("FieldPhotoSelection"));
  assert.ok(source.includes("<ProjectsGrid projects={projects}"));
});
