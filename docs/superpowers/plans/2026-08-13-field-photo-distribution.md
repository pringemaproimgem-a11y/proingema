# Field Photo Distribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Incorporar las 25 fotografías reales de trabajo de campo en la galería y distribuir una selección técnicamente coherente entre la portada, Servicios, Geotecnia y Proyectos.

**Architecture:** Un catálogo tipado en `lib/data/gallery.ts` será la única fuente de rutas, textos alternativos, categorías y ubicaciones destacadas. Un script PowerShell generará copias JPEG optimizadas dentro de `public/images/field-work/`; las páginas consumirán el catálogo mediante selectores puros y la galería usará un visor accesible separado de la cuadrícula.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, `next/image`, Framer Motion, Node test runner y PowerShell/System.Drawing para preparación determinista de imágenes.

## Global Constraints

- Mantener intactos todos los originales ubicados en `D:\brochure pro ingema`.
- Publicar exactamente 25 fotografías reales en la galería.
- No asociar una fotografía con un ensayo, cliente, contrato o proyecto no confirmado.
- Usar únicamente categorías `Calicatas`, `Densidad de campo` y `Obras viales`, además del filtro visual `Todos`.
- Conservar proporción y orientación; limitar el lado mayor de cada copia web a 1800 px y codificar JPEG con calidad 84.
- Usar descripciones de lo visible y textos alternativos de al menos 20 caracteres.
- No añadir dependencias npm nuevas.
- Respetar `prefers-reduced-motion`, navegación por teclado, foco visible y diseño móvil.
- Reutilizar `BrandImage`, `Container`, `SectionHeading`, `Reveal` y el sistema visual existente.

---

## File Structure

- Create `scripts/prepare-field-photos.ps1`: copia, rota según EXIF cuando sea necesario, redimensiona y comprime las 25 fuentes con nombres estables.
- Create `public/images/field-work/*.jpg`: 25 copias optimizadas generadas por el script.
- Modify `lib/data/gallery.ts`: catálogo oficial, tipos, categorías, ubicaciones y selectores.
- Create `tests/field-photo-gallery.test.ts`: integridad del catálogo, archivos, dimensiones, peso, ubicaciones y navegación.
- Modify `package.json`: incluir la nueva prueba en `npm test`.
- Modify `components/home/Hero.tsx`: fotografía real del trabajo en campo como fondo prioritario.
- Modify `components/home/AboutTeaser.tsx`: fotografía real del equipo.
- Modify `lib/data/services.ts`: fotografías pertinentes para estudios geotécnicos y ensayos de campo.
- Create `components/sections/FieldPhotoSelection.tsx`: cuadrícula reutilizable para selecciones editoriales.
- Modify `app/geotecnia/page.tsx`: sección de trabajo geotécnico real.
- Modify `app/proyectos/page.tsx`: sección de trabajos recientes en campo.
- Create `lib/gallery-navigation.ts`: navegación circular pura para el visor.
- Create `components/sections/GalleryLightbox.tsx`: diálogo accesible de fotografía ampliada.
- Modify `components/sections/MasonryGallery.tsx`: filtros nuevos, apertura del visor y tamaños responsivos.
- Modify `app/galeria/page.tsx`: metadatos y texto actualizados para fotografía real.
- Modify `next.config.ts`: retirar el patrón remoto de Unsplash cuando ya no queden referencias.

---

### Task 1: Catálogo oficial y activos optimizados

**Files:**
- Create: `scripts/prepare-field-photos.ps1`
- Create: `public/images/field-work/*.jpg`
- Modify: `lib/data/gallery.ts`
- Create: `tests/field-photo-gallery.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `GalleryCategory`, `FieldPhotoPlacement`, `GalleryImage`, `GALLERY_CATEGORIES`, `GALLERY_IMAGES`, `getFieldPhoto(id)`, `getFieldPhotosByPlacement(placement)`.
- Produces files: 25 JPEG files under `/images/field-work/`, each with longest side `<= 1800` and size `< 1.5 MB`.

- [ ] **Step 1: Add the failing catalog integrity test**

Create `tests/field-photo-gallery.test.ts` with imports and helpers that work with the existing Node test runner:

```ts
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  GALLERY_CATEGORIES,
  GALLERY_IMAGES,
  getFieldPhoto,
  getFieldPhotosByPlacement,
} from "../lib/data/gallery.ts";

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
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
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
  assert.equal(GALLERY_IMAGES.length, 25);
  assert.deepEqual(GALLERY_CATEGORIES, [
    "Todos",
    "Calicatas",
    "Densidad de campo",
    "Obras viales",
  ]);

  assert.equal(GALLERY_IMAGES.filter((photo) => photo.category === "Calicatas").length, 19);
  assert.equal(GALLERY_IMAGES.filter((photo) => photo.category === "Densidad de campo").length, 3);
  assert.equal(GALLERY_IMAGES.filter((photo) => photo.category === "Obras viales").length, 3);

  assert.equal(new Set(GALLERY_IMAGES.map((photo) => photo.id)).size, 25);
  assert.equal(new Set(GALLERY_IMAGES.map((photo) => photo.image)).size, 25);
  assert.ok(GALLERY_IMAGES.every((photo) => photo.alt.trim().length >= 20));
});

test("cada fotografía optimizada existe, es JPEG y no supera los límites web", () => {
  for (const photo of GALLERY_IMAGES) {
    const filePath = path.join(process.cwd(), "public", photo.image.slice(1));
    assert.ok(existsSync(filePath), `Falta ${photo.image}`);
    assert.ok(statSync(filePath).size < 1.5 * 1024 * 1024, `${photo.image} supera 1.5 MB`);

    const dimensions = readJpegDimensions(readFileSync(filePath));
    assert.ok(Math.max(dimensions.width, dimensions.height) <= 1800);
  }
});

test("las ubicaciones destacadas son únicas donde corresponde", () => {
  for (const placement of [
    "home-hero",
    "home-about",
    "service-geotechnical",
    "service-field-tests",
  ] as const) {
    assert.equal(getFieldPhotosByPlacement(placement).length, 1, placement);
  }

  assert.equal(getFieldPhoto("calicata-vivienda-rural-01").category, "Calicatas");
  assert.equal(getFieldPhotosByPlacement("geotechnics").length, 6);
  assert.equal(getFieldPhotosByPlacement("projects").length, 4);
});
```

Add the file to the `test` script in `package.json`:

```json
"test": "node --test tests/brand-logo.test.ts tests/client-logo.test.ts tests/site-content.test.ts tests/contact-form.test.ts tests/field-photo-gallery.test.ts"
```

- [ ] **Step 2: Run the test and verify the intended failure**

Run: `npm test -- --test-name-pattern="catálogo|fotografía|ubicaciones"`

Expected: FAIL because the current catalog contains 12 sample entries and lacks `getFieldPhoto` and `getFieldPhotosByPlacement`.

- [ ] **Step 3: Implement the exact catalog types and selectors**

Replace the current types and selectors in `lib/data/gallery.ts` with:

```ts
export type GalleryCategory = "Calicatas" | "Densidad de campo" | "Obras viales";

export type FieldPhotoPlacement =
  | "home-hero"
  | "home-about"
  | "service-geotechnical"
  | "service-field-tests"
  | "geotechnics"
  | "projects";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  image: string;
  orientation: "landscape" | "portrait";
  placements?: FieldPhotoPlacement[];
};

export const GALLERY_CATEGORIES = [
  "Todos",
  "Calicatas",
  "Densidad de campo",
  "Obras viales",
] as const;

export function getFieldPhoto(id: string): GalleryImage {
  const photo = GALLERY_IMAGES.find((item) => item.id === id);
  if (!photo) throw new Error(`Fotografía de campo desconocida: ${id}`);
  return photo;
}

export function getFieldPhotosByPlacement(placement: FieldPhotoPlacement) {
  return GALLERY_IMAGES.filter((photo) => photo.placements?.includes(placement));
}
```

Populate `GALLERY_IMAGES` using every row in this exact mapping. The caption and alt must describe the activity without naming an unconfirmed client:

| Source file | Output id / filename | Category | Orientation | Placements |
|---|---|---|---|---|
| `IMG_2442.jpg` | `calicata-interior-01.jpg` | Calicatas | portrait | none |
| `IMG_1354.jpg` | `calicata-via-urbana-01.jpg` | Calicatas | landscape | none |
| `IMG_1365.jpg` | `calicata-via-urbana-02.jpg` | Calicatas | landscape | service-geotechnical, geotechnics |
| `IMG_1374.jpg` | `calicata-via-urbana-03.jpg` | Calicatas | landscape | projects |
| `IMG_1388.jpg` | `calicata-via-urbana-04.jpg` | Calicatas | landscape | geotechnics |
| `IMG_1389.jpg` | `calicata-via-urbana-05.jpg` | Calicatas | landscape | none |
| `IMG_2759.jpg` | `calicata-local-comercial-01.jpg` | Calicatas | landscape | geotechnics |
| `IMG_2379.jpg` | `calicata-vivienda-rural-01.jpg` | Calicatas | landscape | home-hero, geotechnics |
| `IMG_2758.jpg` | `calicata-local-comercial-02.jpg` | Calicatas | portrait | none |
| `IMG_2464.jpg` | `calicata-institucion-01.jpg` | Calicatas | landscape | geotechnics |
| `IMG_2706.jpg` | `calicata-infraestructura-deportiva-01.jpg` | Calicatas | portrait | projects |
| `IMG_2363.jpg` | `calicata-vivienda-rural-02.jpg` | Calicatas | landscape | none |
| `IMG_2380.jpg` | `calicata-vivienda-rural-03.jpg` | Calicatas | landscape | geotechnics |
| `IMG_1353.jpg` | `calicata-via-urbana-06.jpg` | Calicatas | landscape | none |
| `IMG_1084.jpg` | `calicata-via-urbana-07.jpg` | Calicatas | portrait | geotechnics |
| `IMG_1259.jpg` | `calicata-planta-concreto-01.jpg` | Calicatas | landscape | none |
| `IMG_2463.jpg` | `calicata-institucion-02.jpg` | Calicatas | landscape | none |
| `IMG_1254.jpg` | `calicata-planta-concreto-02.jpg` | Calicatas | landscape | projects |
| `IMG_1261.jpg` | `calicata-planta-concreto-03.jpg` | Calicatas | landscape | none |
| `9555fec1-a14f-435d-859e-af9f2c25f037.jpg` | `densidad-via-vimpampa-01.jpg` | Densidad de campo | landscape | none |
| `b3504460-c663-45d4-98b7-1af426787c64.jpg` | `densidad-via-vimpampa-02.jpg` | Densidad de campo | landscape | none |
| `bd5c8555-d256-424f-808a-b41846eb911a.jpg` | `densidad-via-vimpampa-03.jpg` | Densidad de campo | landscape | none |
| `958e2d2b-098e-432b-8e91-8061ef029cc5.jpg` | `densidad-obra-vial-01.jpg` | Obras viales | landscape | service-field-tests |
| `af1d46a4-a1be-43bd-813d-d6505bec3a46.jpg` | `densidad-obra-vial-02.jpg` | Obras viales | landscape | home-about, projects |
| `b91bcf1c-80e5-4805-a6ad-ce300fe99baf.jpg` | `densidad-obra-vial-03.jpg` | Obras viales | landscape | projects |

Use `/images/field-work/<filename>` for each `image`. Use concise captions such as “Medición de calicata en vía urbana” and richer alts such as “Especialista de PRO INGEMA midiendo una calicata abierta en una vía urbana”.

- [ ] **Step 4: Create the deterministic preparation script**

Create `scripts/prepare-field-photos.ps1` with `Set-StrictMode -Version Latest`, the exact 25 source/output pairs above, `System.Drawing.Bitmap`, bicubic interpolation, JPEG codec quality `84L`, and these rules:

```powershell
$maxSide = 1800
$jpegQuality = 84L
$destinationDir = Join-Path $PSScriptRoot '..\public\images\field-work'
New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null

function Get-ScaledSize([int]$width, [int]$height) {
  $scale = [Math]::Min(1.0, $maxSide / [double][Math]::Max($width, $height))
  return @(
    [Math]::Max(1, [int][Math]::Round($width * $scale)),
    [Math]::Max(1, [int][Math]::Round($height * $scale))
  )
}
```

For each source, load with `[System.Drawing.Image]::FromFile`, apply EXIF orientation values 3, 6 and 8 when property `0x0112` exists, draw into a fresh 24-bit bitmap using `HighQualityBicubic`, save through the JPEG encoder with quality 84, then dispose every image, bitmap, graphics object and encoder parameter in `finally` blocks. Resolve and validate every output path before saving so all generated files remain under `$destinationDir`.

- [ ] **Step 5: Generate the 25 optimized assets**

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\prepare-field-photos.ps1`

Expected: 25 lines reporting source, output dimensions and size, followed by a summary `25 fotografías preparadas`.

- [ ] **Step 6: Run the catalog tests**

Run: `npm test -- --test-name-pattern="catálogo|fotografía|ubicaciones"`

Expected: PASS for catalog count, categories, unique routes, JPEG existence, maximum dimension, maximum size and placements.

- [ ] **Step 7: Commit the catalog and generated assets**

```powershell
git add package.json lib/data/gallery.ts tests/field-photo-gallery.test.ts scripts/prepare-field-photos.ps1 public/images/field-work
git commit -m "feat: add optimized field photo catalog"
```

---

### Task 2: Real photography on the home and service pages

**Files:**
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/AboutTeaser.tsx`
- Modify: `lib/data/services.ts`
- Modify: `tests/field-photo-gallery.test.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: `getFieldPhotosByPlacement(placement)` and `getFieldPhoto(id)` from Task 1.
- Produces: a home hero and about image backed by local assets; two service entries backed by appropriate local field photos.

- [ ] **Step 1: Add failing placement usage assertions**

Append to `tests/field-photo-gallery.test.ts`:

```ts
import { SERVICES } from "../lib/data/services.ts";

test("los servicios geotécnicos y de campo usan fotografías reales pertinentes", () => {
  const geotechnical = SERVICES.find((service) => service.slug === "estudios-geotecnicos");
  const fieldTests = SERVICES.find((service) => service.slug === "ensayos-de-campo");

  assert.equal(
    geotechnical?.image,
    getFieldPhotosByPlacement("service-geotechnical")[0].image,
  );
  assert.equal(
    fieldTests?.image,
    getFieldPhotosByPlacement("service-field-tests")[0].image,
  );
});
```

Append this exact source-level test using the `readFileSync` and `path` imports already present:

```ts
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
```

- [ ] **Step 2: Run the placement test and verify failure**

Run: `npm test -- --test-name-pattern="servicios geotécnicos|portada"`

Expected: FAIL because the home still uses Unsplash and service data still uses previous media paths.

- [ ] **Step 3: Replace the home hero background**

In `components/home/Hero.tsx`, import `BrandImage` and `getFieldPhotosByPlacement`, resolve the single hero photo once outside the component, and replace the CSS remote background div with:

```tsx
const HOME_HERO_PHOTO = getFieldPhotosByPlacement("home-hero")[0];

<BrandImage
  src={HOME_HERO_PHOTO.image}
  alt={HOME_HERO_PHOTO.alt}
  priority
  sizes="100vw"
  className="absolute inset-0"
/>
```

Keep both existing overlays and all text/motion content unchanged.

- [ ] **Step 4: Replace the home about image**

In `components/home/AboutTeaser.tsx`, select `home-about` and pass its `image` and `alt` to the existing `BrandImage`. Keep the 2011 badge and layout unchanged.

- [ ] **Step 5: Connect the two relevant service images**

In `lib/data/services.ts`, import `getFieldPhotosByPlacement` and define:

```ts
const GEOTECHNICAL_PHOTO = getFieldPhotosByPlacement("service-geotechnical")[0];
const FIELD_TEST_PHOTO = getFieldPhotosByPlacement("service-field-tests")[0];
```

Use `GEOTECHNICAL_PHOTO.image` only for `estudios-geotecnicos` and `FIELD_TEST_PHOTO.image` only for `ensayos-de-campo`. Leave the other four service images unchanged.

- [ ] **Step 6: Remove the obsolete Unsplash configuration**

Search: `rg -n "images\.unsplash\.com" app components lib`

If no runtime source remains, replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 7: Run targeted tests and lint**

Run: `npm test -- --test-name-pattern="servicios geotécnicos|portada"`

Expected: PASS.

Run: `npx eslint components/home/Hero.tsx components/home/AboutTeaser.tsx lib/data/services.ts next.config.ts tests/field-photo-gallery.test.ts`

Expected: exit code 0.

- [ ] **Step 8: Commit the home and service distribution**

```powershell
git add components/home/Hero.tsx components/home/AboutTeaser.tsx lib/data/services.ts next.config.ts tests/field-photo-gallery.test.ts
git commit -m "feat: distribute real photos across home and services"
```

---

### Task 3: Curated field-work sections on Geotecnia and Proyectos

**Files:**
- Create: `components/sections/FieldPhotoSelection.tsx`
- Modify: `app/geotecnia/page.tsx`
- Modify: `app/proyectos/page.tsx`
- Modify: `tests/field-photo-gallery.test.ts`

**Interfaces:**
- Consumes: `GalleryImage[]` from Task 1.
- Produces: `FieldPhotoSelection({ photos, label }: { photos: GalleryImage[]; label: string })`.

- [ ] **Step 1: Add the failing reusable component test**

Append imports for `createElement`, `renderToStaticMarkup` and `FieldPhotoSelection` to `tests/field-photo-gallery.test.ts`, then add:

```ts
test("la selección editorial renderiza todas sus fotografías con texto alternativo", () => {
  const photos = getFieldPhotosByPlacement("geotechnics");
  const markup = renderToStaticMarkup(
    createElement(FieldPhotoSelection, {
      photos,
      label: "Trabajo geotécnico en campo",
    }),
  );

  for (const photo of photos) {
    assert.ok(markup.includes(photo.alt));
    assert.ok(markup.includes(photo.caption));
  }
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- --test-name-pattern="selección editorial"`

Expected: FAIL because `FieldPhotoSelection` does not exist.

- [ ] **Step 3: Implement the reusable editorial grid**

Create `components/sections/FieldPhotoSelection.tsx` as a server-compatible component. Render a semantic list with `aria-label={label}`, use a responsive two-column grid, let the first landscape photo span both columns at `md`, and render each item with:

```tsx
<figure className="group overflow-hidden rounded-2xl bg-brand-dark">
  <BrandImage
    src={photo.image}
    alt={photo.alt}
    sizes="(min-width: 1024px) 50vw, 100vw"
    className={cn(
      "w-full transition-transform duration-500 group-hover:scale-[1.02]",
      photo.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]",
    )}
  />
  <figcaption className="px-5 py-4 text-sm font-medium text-white/85">
    {photo.caption}
  </figcaption>
</figure>
```

Use `BrandImage` for all photos and do not add a nested card around the grid.

- [ ] **Step 4: Add the Geotecnia section**

In `app/geotecnia/page.tsx`, after the existing field-test list and inside the same white section, add a separated subsection using `SectionHeading`:

- Eyebrow: `Experiencia en campo`
- Title: `Trabajo geotécnico en condiciones reales`
- Description: `Calicatas, reconocimiento del terreno y registro técnico ejecutados en entornos urbanos y rurales.`
- Photos: `getFieldPhotosByPlacement("geotechnics")`
- Component label: `Selección de trabajos geotécnicos en campo`

Keep the six technical test cards unchanged so photographs never imply an unshown test.

- [ ] **Step 5: Add the Proyectos section**

In `app/proyectos/page.tsx`, insert a new white or light-neutral section between `ProjectsGrid` and `CTABanner`:

- Eyebrow: `Evidencia técnica`
- Title: `Trabajos recientes en campo`
- Description: `Exploración, medición y control de calidad realizados por nuestro equipo en distintos contextos de obra.`
- Photos: `getFieldPhotosByPlacement("projects")`
- Component label: `Selección de trabajos recientes de PRO INGEMA`

Do not modify the current six project cards or their client claims.

- [ ] **Step 6: Run targeted tests and lint**

Run: `npm test -- --test-name-pattern="selección editorial|ubicaciones"`

Expected: PASS.

Run: `npx eslint components/sections/FieldPhotoSelection.tsx app/geotecnia/page.tsx app/proyectos/page.tsx tests/field-photo-gallery.test.ts`

Expected: exit code 0.

- [ ] **Step 7: Commit the curated sections**

```powershell
git add components/sections/FieldPhotoSelection.tsx app/geotecnia/page.tsx app/proyectos/page.tsx tests/field-photo-gallery.test.ts
git commit -m "feat: add curated field work sections"
```

---

### Task 4: Filterable 25-photo gallery with accessible lightbox

**Files:**
- Create: `lib/gallery-navigation.ts`
- Create: `components/sections/GalleryLightbox.tsx`
- Modify: `components/sections/MasonryGallery.tsx`
- Modify: `app/galeria/page.tsx`
- Modify: `tests/field-photo-gallery.test.ts`

**Interfaces:**
- Produces: `getAdjacentGalleryIndex(current: number, direction: -1 | 1, total: number): number`.
- Produces: `GalleryLightbox` props `{ photo, currentIndex, total, onClose, onPrevious, onNext }`.
- Consumes: all 25 `GalleryImage` records from Task 1.

- [ ] **Step 1: Add failing circular navigation tests**

Append:

```ts
import { getAdjacentGalleryIndex } from "../lib/gallery-navigation.ts";

test("la navegación del visor avanza y retrocede de forma circular", () => {
  assert.equal(getAdjacentGalleryIndex(0, 1, 25), 1);
  assert.equal(getAdjacentGalleryIndex(24, 1, 25), 0);
  assert.equal(getAdjacentGalleryIndex(0, -1, 25), 24);
  assert.equal(getAdjacentGalleryIndex(12, -1, 25), 11);
  assert.throws(() => getAdjacentGalleryIndex(0, 1, 0), /al menos una fotografía/);
});
```

- [ ] **Step 2: Run the navigation test and verify failure**

Run: `npm test -- --test-name-pattern="navegación del visor"`

Expected: FAIL because `lib/gallery-navigation.ts` does not exist.

- [ ] **Step 3: Implement circular navigation**

Create:

```ts
export function getAdjacentGalleryIndex(
  current: number,
  direction: -1 | 1,
  total: number,
) {
  if (total < 1) throw new Error("El visor requiere al menos una fotografía");
  return (current + direction + total) % total;
}
```

- [ ] **Step 4: Create the accessible lightbox**

Create `components/sections/GalleryLightbox.tsx` with `"use client"`. It must:

- render only when `photo` exists;
- use `role="dialog"`, `aria-modal="true"` and ``aria-label={`Fotografía ampliada: ${photo.caption}`}``;
- add `imageClassName?: string` to `BrandImageProps`, destructure it in `BrandImage`, and change the internal image class to `className={cn("object-cover", imageClassName)}`;
- render the real photo with `BrandImage`, `sizes="100vw"` and `imageClassName="object-contain"`;
- show caption and counter `${currentIndex + 1} / ${total}`;
- provide visible buttons labelled `Cerrar fotografía`, `Fotografía anterior`, `Fotografía siguiente`;
- close on `Escape`, navigate on `ArrowLeft` and `ArrowRight` using one document keydown listener cleaned up in `useEffect`;
- lock body scroll while open and restore the previous value on cleanup;
- focus the close button on mount and return focus to the triggering thumbnail when the parent closes it;
- use a dark translucent fixed backdrop and stop click propagation inside the image panel;
- disable nonessential scaling transitions under `motion-reduce`.

- [ ] **Step 5: Connect filters, thumbnails and lightbox**

In `components/sections/MasonryGallery.tsx`:

- type filter from `GALLERY_CATEGORIES[number]`;
- replace the generated fixed-height list with aspect ratios derived from `photo.orientation`;
- make each figure a real `<button type="button">` labelled `Ampliar: ${photo.caption}`;
- keep filtered ordering stable;
- store the selected photo id, derive its index from the filtered list and use `getAdjacentGalleryIndex` for next/previous;
- clear selection when the filter changes;
- retain a ref to the triggering button and refocus it on close;
- render `GalleryLightbox` after the mosaic;
- set `sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"` on thumbnails;
- keep current subtle filter animation and add `motion-reduce:transition-none` where CSS transitions remain.

- [ ] **Step 6: Add source-level accessibility assertions**

Append this test, which complements the pure navigation test in the current no-DOM environment:

```ts
test("el visor y las miniaturas exponen controles accesibles", () => {
  const lightboxSource = readFileSync(
    path.join(process.cwd(), "components", "sections", "GalleryLightbox.tsx"),
    "utf8",
  );
  const masonrySource = readFileSync(
    path.join(process.cwd(), "components", "sections", "MasonryGallery.tsx"),
    "utf8",
  );

  for (const token of [
    'role="dialog"',
    "aria-modal",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "Cerrar fotografía",
  ]) {
    assert.ok(lightboxSource.includes(token), `Falta ${token} en el visor`);
  }
  assert.ok(masonrySource.includes("Ampliar:"));
  assert.ok(masonrySource.includes('type="button"'));
});
```

- [ ] **Step 7: Update gallery copy**

In `app/galeria/page.tsx`, keep the structure and replace the metadata/hero copy with valid UTF-8 text:

- Title metadata: `Galería de trabajos de campo`
- Description metadata: `Galería fotográfica de PRO INGEMA S.A.C.: calicatas, estudios de suelos, densidad de campo y control técnico en obras viales.`
- Eyebrow: `Galería`
- Title: `Nuestro trabajo real en imágenes`
- Description: `Exploración geotécnica, calicatas y control de densidad ejecutados por nuestro equipo en diferentes contextos de obra.`

- [ ] **Step 8: Run gallery tests and lint**

Run: `npm test -- --test-name-pattern="catálogo|fotografía|visor|selección editorial"`

Expected: PASS.

Run: `npx eslint components/sections/GalleryLightbox.tsx components/sections/MasonryGallery.tsx components/ui/BrandImage.tsx lib/gallery-navigation.ts app/galeria/page.tsx tests/field-photo-gallery.test.ts`

Expected: exit code 0.

- [ ] **Step 9: Commit the gallery experience**

```powershell
git add components/sections/GalleryLightbox.tsx components/sections/MasonryGallery.tsx components/ui/BrandImage.tsx lib/gallery-navigation.ts app/galeria/page.tsx tests/field-photo-gallery.test.ts
git commit -m "feat: add accessible field photo gallery"
```

---

### Task 5: Full verification and visual QA

**Files:**
- Modify only files that require a verified correction.

**Interfaces:**
- Consumes all deliverables from Tasks 1–4.
- Produces a verified production build and visual QA record in the task handoff.

- [ ] **Step 1: Verify all automated tests**

Run: `npm test`

Expected: every test passes, including exactly 25 field photos, asset limits, placements, selection markup, circular navigation and lightbox source assertions.

- [ ] **Step 2: Run full lint**

Run: `npm run lint`

Expected: exit code 0 with no errors in changed files. If unrelated pre-existing warnings remain, record their exact paths without changing unrelated code.

- [ ] **Step 3: Build the production site**

Run: `npm run build`

Expected: Next.js production build completes and `/`, `/servicios`, `/geotecnia`, `/proyectos` and `/galeria` are generated successfully.

- [ ] **Step 4: Verify asset count and weight from PowerShell**

Run:

```powershell
$assets = Get-ChildItem -LiteralPath '.\public\images\field-work' -Filter '*.jpg'
if ($assets.Count -ne 25) { throw "Se esperaban 25 fotografías y existen $($assets.Count)" }
$tooLarge = $assets | Where-Object Length -ge 1572864
if ($tooLarge) { throw "Hay fotografías mayores o iguales a 1.5 MB" }
$assets | Measure-Object Length -Sum -Average | Select-Object Count,Sum,Average
```

Expected: `Count` is 25 and no exception is thrown.

- [ ] **Step 5: Run local visual QA**

Start: `npm run dev`

Inspect at desktop width around 1440 px and mobile width around 390 px:

- `/`: hero text readable; photo not stretched; about image relevant; no Unsplash request.
- `/servicios`: geotechnical and field-test images match their service; other four remain unchanged.
- `/geotecnia`: six-photo section has no misleading test labels or overflow.
- `/proyectos`: four-photo recent-work section does not alter existing project claims.
- `/galeria`: 25 items; all four filters work; portraits are not distorted; viewer opens, closes, wraps previous/next and responds to Escape/arrows.
- reduced-motion mode: content remains usable with nonessential motion removed.

- [ ] **Step 6: Check the final diff is scoped**

Run: `git status --short` and `git diff --stat HEAD~4..HEAD`.

Expected: only the files listed in this plan plus generated `public/images/field-work/*.jpg` are part of the feature. Preserve unrelated pre-existing changes.

- [ ] **Step 7: Commit verified corrections only if needed**

If Step 5 reveals a defect, add only the corrected feature files and commit:

```powershell
git add components/sections/MasonryGallery.tsx components/sections/GalleryLightbox.tsx components/sections/FieldPhotoSelection.tsx components/home/Hero.tsx components/home/AboutTeaser.tsx app/geotecnia/page.tsx app/proyectos/page.tsx app/galeria/page.tsx
git commit -m "fix: polish field photo presentation"
```

If no correction was necessary, do not create an empty commit.
