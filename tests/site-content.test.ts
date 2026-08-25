import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { NAV_LINKS } from "../lib/constants.ts";
import { CLIENTS } from "../lib/data/clients.ts";
import { ENVIRONMENTAL_SERVICE_GROUPS } from "../lib/data/environmental.ts";
import { MEDIA_ASSETS } from "../lib/data/media.ts";
import { SERVICES } from "../lib/data/services.ts";

test("la navegación no repite destinos y todas las rutas son internas", () => {
  const destinations = NAV_LINKS.map((link) => link.href);

  assert.equal(new Set(destinations).size, destinations.length);
  assert.ok(destinations.every((href) => href.startsWith("/")));
  assert.deepEqual(destinations.slice(0, 3), ["/", "/nosotros", "/servicios"]);
});

test("el catálogo conserva las cuatro capacidades técnicas principales", () => {
  const slugs = new Set(SERVICES.map((service) => service.slug));

  for (const requiredSlug of [
    "estudios-geotecnicos",
    "estudios-geofisicos",
    "laboratorio-de-materiales",
    "estudios-ambientales",
  ]) {
    assert.ok(slugs.has(requiredSlug), `Falta el servicio ${requiredSlug}`);
  }
});

test("los servicios ambientales se organizan en los grupos documentados", () => {
  const groupTitles = ENVIRONMENTAL_SERVICE_GROUPS.map((group) => group.title);

  assert.deepEqual(groupTitles, [
    "Monitoreo ambiental",
    "Instrumentos de gestión ambiental",
    "Gestión territorial y social",
  ]);
  assert.ok(ENVIRONMENTAL_SERVICE_GROUPS.every((group) => group.items.length >= 3));
});

test("cada recurso visual publicado existe dentro de public", () => {
  assert.ok(MEDIA_ASSETS.length >= 8, "La web necesita una selección visual suficiente");

  for (const media of MEDIA_ASSETS) {
    const publicPath = path.join(process.cwd(), "public", media.src.replace(/^\//, ""));
    assert.ok(existsSync(publicPath), `No existe el recurso ${media.src}`);
    assert.ok(media.alt.trim().length >= 12, `El texto alternativo es insuficiente: ${media.id}`);
  }
});

test("el logotipo oficial conserva dimensiones y canal alfa", () => {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "pro-ingema",
    "logo-pro-ingema.png",
  );
  const logo = readFileSync(logoPath);

  assert.deepEqual([...logo.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(logo.readUInt32BE(16), 1182, "El ancho debe conservar el original");
  assert.equal(logo.readUInt32BE(20), 1331, "El alto debe conservar el original");
  assert.equal(
    logo[25],
    6,
    "El PNG debe usar color RGBA con canal alfa",
  );
});
test("los siete clientes usan logos institucionales RGBA preparados para web", () => {
  const expected = [
    ["/images/clients/plan-copesco.png", 900, 356],
    ["/images/clients/gore-cusco.png", 900, 900],
    ["/images/clients/provias-descentralizado.png", 900, 703],
    ["/images/clients/gore-apurimac.png", 782, 900],
    ["/images/clients/pescs.png", 687, 900],
    ["/images/clients/gore-madre-de-dios.png", 900, 876],
    ["/images/clients/ima.png", 900, 521],
  ] as const;

  assert.equal(CLIENTS.length, expected.length);

  CLIENTS.forEach((client, index) => {
    const [logo, width, height] = expected[index];
    assert.equal(client.logo, logo);
    assert.equal(client.logoWidth, width);
    assert.equal(client.logoHeight, height);
    assert.ok(client.logoAlt.includes(client.name));

    const file = readFileSync(path.join(process.cwd(), "public", logo.slice(1)));
    assert.deepEqual([...file.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(file.readUInt32BE(16), width);
    assert.equal(file.readUInt32BE(20), height);
    assert.equal(file[25], 6, `${logo} debe conservar un canal alfa RGBA`);
  });
});
