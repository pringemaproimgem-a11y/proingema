import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import * as gallery from "../lib/data/gallery.ts";

function readJpegDimensions(buffer: Buffer) {
  assert.equal(buffer[0], 0xff);
  assert.equal(buffer[1], 0xd8);
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (
      [
        0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd,
        0xce, 0xcf,
      ].includes(marker)
    ) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }

  throw new Error("JPEG sin marcador de dimensiones");
}

test("el catálogo contiene las 25 fotografías reales y sus tres categorías", () => {
  assert.equal(gallery.GALLERY_IMAGES.length, 25);
  assert.deepEqual(gallery.GALLERY_CATEGORIES, [
    "Todos",
    "Calicatas",
    "Densidad de campo",
    "Obras viales",
  ]);

  assert.equal(
    gallery.GALLERY_IMAGES.filter((photo) => photo.category === "Calicatas").length,
    19,
  );
  assert.equal(
    gallery.GALLERY_IMAGES.filter((photo) => photo.category === "Densidad de campo")
      .length,
    3,
  );
  assert.equal(
    gallery.GALLERY_IMAGES.filter((photo) => photo.category === "Obras viales").length,
    3,
  );

  assert.equal(new Set(gallery.GALLERY_IMAGES.map((photo) => photo.id)).size, 25);
  assert.equal(new Set(gallery.GALLERY_IMAGES.map((photo) => photo.image)).size, 25);
  assert.ok(gallery.GALLERY_IMAGES.every((photo) => photo.alt.trim().length >= 20));
});

test("cada fotografía optimizada existe, es JPEG y no supera los límites web", () => {
  for (const photo of gallery.GALLERY_IMAGES) {
    const filePath = path.join(process.cwd(), "public", photo.image.slice(1));
    assert.ok(existsSync(filePath), `Falta ${photo.image}`);
    assert.ok(
      statSync(filePath).size < 1.5 * 1024 * 1024,
      `${photo.image} supera 1.5 MB`,
    );

    const dimensions = readJpegDimensions(readFileSync(filePath));
    assert.ok(Math.max(dimensions.width, dimensions.height) <= 1800);
  }
});

test("las ubicaciones destacadas son únicas donde corresponde", () => {
  const selectPlacement = Reflect.get(gallery, "getFieldPhotosByPlacement");
  const selectPhoto = Reflect.get(gallery, "getFieldPhoto");

  assert.equal(typeof selectPlacement, "function");
  assert.equal(typeof selectPhoto, "function");

  for (const placement of [
    "home-hero",
    "home-about",
    "service-geotechnical",
    "service-field-tests",
  ]) {
    assert.equal(selectPlacement(placement).length, 1, placement);
  }

  assert.equal(selectPhoto("calicata-vivienda-rural-01").category, "Calicatas");
  assert.equal(selectPlacement("geotechnics").length, 6);
  assert.equal(selectPlacement("projects").length, 4);
});
