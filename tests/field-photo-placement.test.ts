import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { getFieldPhotosByPlacement } from "../lib/data/gallery.ts";
import { SERVICES } from "../lib/data/services.ts";

test("los servicios geotécnicos y de campo usan fotografías reales pertinentes", () => {
  const geotechnical = SERVICES.find(
    (service) => service.slug === "estudios-geotecnicos",
  );
  const fieldTests = SERVICES.find(
    (service) => service.slug === "ensayos-de-campo",
  );

  assert.equal(
    geotechnical?.image,
    getFieldPhotosByPlacement("service-geotechnical")[0].image,
  );
  assert.equal(
    fieldTests?.image,
    getFieldPhotosByPlacement("service-field-tests")[0].image,
  );
});

test("la portada usa fotografías locales y carga primero el hero", () => {
  const heroSource = readFileSync(
    path.join(process.cwd(), "components", "home", "Hero.tsx"),
    "utf8",
  );
  const aboutSource = readFileSync(
    path.join(process.cwd(), "components", "home", "AboutTeaser.tsx"),
    "utf8",
  );

  assert.match(heroSource, /home-hero/);
  assert.match(heroSource, /priority/);
  assert.match(aboutSource, /home-about/);
  assert.doesNotMatch(heroSource, /images\.unsplash\.com/);
  assert.doesNotMatch(aboutSource, /images\.unsplash\.com/);
});
