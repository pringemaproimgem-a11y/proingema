# PRO INGEMA Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved dark PRO INGEMA website using the company’s real logo, photography, and technical service content across every existing route.

**Architecture:** Keep the existing Next.js 16 App Router and Tailwind CSS 4 structure. Centralize verified content and media references under `lib/data`, preserve focused shared UI components, and update each route through the global dark visual system instead of duplicating page-specific styling.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4, Framer Motion, Next Image, Node 24 test runner.

## Global Constraints

- The approved dark reference in `docs/superpowers/specs/assets/pro-ingema-approved-reference.png` is the visual authority.
- Use content and media from `D:\niki\contexto`; do not invent clients, projects, certifications, statistics, or results.
- Keep Next.js 16.2.10, React 19, Tailwind CSS 4, and the existing App Router.
- Do not add a CMS, authentication, payments, admin interface, or external integrations.
- Replace remote Unsplash imagery with local PRO INGEMA media.
- Preserve all existing routes and provide a coherent mobile experience.
- Respect `prefers-reduced-motion`; animated content must remain visible when motion is disabled.
- Run lint, production build, automated tests, desktop QA, and mobile QA before completion.

---

## File Structure

- `lib/data/media.ts`: single typed catalog of local brand and photography assets.
- `lib/data/environmental.ts`: verified environmental service groups extracted from the supplied document.
- `lib/data/services.ts`, `lib/data/lab-tests.ts`, `lib/data/field-tests.ts`: verified commercial and technical content.
- `lib/contact-form.ts`: pure contact-form validation used by the client form and automated tests.
- `tests/site-content.test.ts`: asset, navigation, and content-contract tests.
- `tests/contact-form.test.ts`: contact validation behavior.
- `components/layout/*`: global header, menu, footer, WhatsApp action.
- `components/home/*`: approved homepage composition.
- `components/ui/*`: visual primitives shared by internal pages.
- `components/sections/*`: route-level reusable content sections.
- `app/**/page.tsx`: route composition and metadata.
- `app/not-found.tsx`: branded 404 state.
- `public/images/pro-ingema/*`: selected company-owned media with descriptive names.

### Task 1: Establish verified content and test contracts

**Files:**
- Modify: `package.json`
- Create: `tests/site-content.test.ts`
- Create: `tests/contact-form.test.ts`
- Create: `lib/contact-form.ts`
- Create: `lib/data/media.ts`
- Create: `lib/data/environmental.ts`
- Modify: `lib/data/services.ts`
- Modify: `lib/data/lab-tests.ts`
- Modify: `lib/data/field-tests.ts`

**Interfaces:**
- Produces: `SITE_MEDIA`, `ENVIRONMENTAL_SERVICES`, verified service/test arrays, and `validateContactForm(input): ContactErrors`.
- Consumes: existing `NAV_LINKS` and company constants.

- [ ] **Step 1: Read the required Next.js 16 guides**

Read these files completely before changing application code:

```powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/11-css.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md
Get-Content -Raw node_modules/next/dist/docs/03-architecture/accessibility.md
```

- [ ] **Step 2: Write failing content tests**

Create `tests/site-content.test.ts` with real assertions:

```ts
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { NAV_LINKS } from "../lib/constants.ts";
import { SITE_MEDIA } from "../lib/data/media.ts";
import { SERVICES } from "../lib/data/services.ts";
import { ENVIRONMENTAL_SERVICES } from "../lib/data/environmental.ts";

test("every navigation route is unique and internal", () => {
  assert.equal(new Set(NAV_LINKS.map((item) => item.href)).size, NAV_LINKS.length);
  assert.ok(NAV_LINKS.every((item) => item.href.startsWith("/")));
});

test("all approved media files exist under public", () => {
  for (const src of Object.values(SITE_MEDIA)) {
    assert.ok(existsSync(join(process.cwd(), "public", src)), `Missing ${src}`);
  }
});

test("the verified catalog exposes every principal capability", () => {
  const slugs = new Set(SERVICES.map((service) => service.slug));
  for (const slug of ["estudios-geotecnicos", "laboratorio-materiales", "servicios-geofisicos", "gestion-ambiental"]) {
    assert.ok(slugs.has(slug), `Missing ${slug}`);
  }
  assert.ok(ENVIRONMENTAL_SERVICES.length >= 6);
});
```

- [ ] **Step 3: Write failing contact validation tests**

Create `tests/contact-form.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { validateContactForm } from "../lib/contact-form.ts";

test("requires a name and contact channel", () => {
  const errors = validateContactForm({ name: "", email: "", phone: "", message: "Ensayo SPT" });
  assert.equal(errors.name, "Ingresa tu nombre");
  assert.equal(errors.contact, "Ingresa un correo o teléfono");
});

test("rejects malformed email and short requests", () => {
  const errors = validateContactForm({ name: "Ana", email: "ana@", phone: "", message: "Hola" });
  assert.equal(errors.email, "Ingresa un correo válido");
  assert.equal(errors.message, "Cuéntanos un poco más sobre el proyecto");
});

test("accepts a complete quotation request", () => {
  const errors = validateContactForm({ name: "Ana Quispe", email: "ana@example.com", phone: "", message: "Necesito un estudio de mecánica de suelos para una edificación en Cusco." });
  assert.deepEqual(errors, {});
});
```

- [ ] **Step 4: Add the test script and verify RED**

Add to `package.json`:

```json
"test": "node --test tests/site-content.test.ts tests/contact-form.test.ts"
```

Run:

```powershell
npm test
```

Expected: FAIL because `media.ts`, `environmental.ts`, `contact-form.ts`, and required asset files do not exist yet.

- [ ] **Step 5: Implement the minimum data and validation contracts**

Implement `ContactInput`, `ContactErrors`, and `validateContactForm`. Populate `SITE_MEDIA` with absolute public paths such as `/images/pro-ingema/hero-calicatas.jpg`. Populate verified service arrays from the three supplied DOCX files, using descriptive names and no unverified claims.

- [ ] **Step 6: Re-run tests and commit**

Run `npm test`; expected: contact tests pass while only the missing-media assertions remain failing until Task 2 copies the approved files. Commit the data and test foundation after Task 2 turns the suite fully green.

### Task 2: Curate and install real company media

**Files:**
- Create: `public/images/pro-ingema/logo-proingema.png`
- Create: `public/images/pro-ingema/hero-calicatas.jpg`
- Create: `public/images/pro-ingema/equipo-geofisica.jpg`
- Create: `public/images/pro-ingema/diseno-mezcla.jpg`
- Create: `public/images/pro-ingema/esclerometria-campo.jpg`
- Create: `public/images/pro-ingema/densidad-campo-vias.jpg`
- Create: `public/images/pro-ingema/galeria/*.jpg`
- Modify: `lib/data/media.ts`

**Interfaces:**
- Produces: valid local image paths consumed by `BrandImage`, homepage, gallery, services, and page heroes.
- Consumes: media from `D:\niki\contexto\Fotos y videos` and `D:\niki\contexto\logo-proingema.png`.

- [ ] **Step 1: Inspect and select usable images**

Open the final candidates at original resolution. Reject corrupted, duplicate, heavily blurred, or poorly framed files. Select at least one usable image from each available category.

- [ ] **Step 2: Copy files with descriptive stable names**

Copy explicit source files into `public/images/pro-ingema/`; do not rename via wildcards. Keep source files untouched.

- [ ] **Step 3: Complete the media catalog**

Export a typed object:

```ts
export const SITE_MEDIA = {
  logo: "/images/pro-ingema/logo-proingema.png",
  hero: "/images/pro-ingema/hero-calicatas.jpg",
  geophysicsTeam: "/images/pro-ingema/equipo-geofisica.jpg",
  concreteMix: "/images/pro-ingema/diseno-mezcla.jpg",
  esclerometry: "/images/pro-ingema/esclerometria-campo.jpg",
  fieldDensity: "/images/pro-ingema/densidad-campo-vias.jpg",
} as const;
```

- [ ] **Step 4: Verify GREEN and commit Tasks 1–2**

Run:

```powershell
npm test
```

Expected: all content, asset, and validation tests PASS.

Commit:

```powershell
git add package.json tests lib/data lib/contact-form.ts public/images/pro-ingema
git commit -m "feat: add verified PRO INGEMA content and media"
```

### Task 3: Build the approved global visual system and navigation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `app/not-found.tsx`
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `components/layout/WhatsAppButton.tsx`
- Modify: `components/ui/Button.tsx`
- Modify: `components/ui/Container.tsx`
- Modify: `components/ui/PageHero.tsx`
- Modify: `components/ui/Reveal.tsx`
- Modify: `components/ui/SectionHeading.tsx`
- Modify: `components/ui/BrandImage.tsx`

**Interfaces:**
- Produces: dark design tokens, skip link, compact header, accessible full-screen menu, page hero, footer, reduced-motion behavior, and image fallback.
- Consumes: `NAV_LINKS`, `COMPANY`, `SITE_MEDIA`, existing `cn()` helper.

- [ ] **Step 1: Add global tokens and accessibility baselines**

Define the approved palette in Tailwind theme variables: charcoal `#181b19`, deep charcoal `#101311`, vivid green `#00c52b`, deep green `#079326`, orange `#f59a23`, warm white `#f5f4ef`. Add focus rings, selection color, technical grid texture, layered image overlays, reduced-motion rules, and `.skip-link` behavior.

- [ ] **Step 2: Update root layout and metadata**

Keep `Inter` and `Space_Grotesk`, add a visible-on-focus skip link targeting `<main id="main-content">`, reference the real logo for social metadata where supported, and keep Spanish locale metadata.

- [ ] **Step 3: Rebuild navigation against the approved screenshot**

Use a compact `PI` monogram plus PRO INGEMA wordmark in the fixed header, a high-contrast hamburger, and a full-screen menu panel containing the official logo, all routes, email, phone, and quotation CTA. Add `aria-expanded`, `aria-controls`, Escape handling, focus visibility, active route state, and reliable body scroll restoration.

- [ ] **Step 4: Unify shared components**

Update button, heading, image, reveal, page hero, footer, and WhatsApp components to use the approved system. `Reveal` must render content visibly under reduced motion and must not leave off-screen sections at opacity 0 during automated or manual capture.

- [ ] **Step 5: Add branded 404 and verify**

Create `app/not-found.tsx` with a return-home action and contact link. Run `npm test`, `npm run lint`, and inspect `/does-not-exist` locally.

- [ ] **Step 6: Commit**

```powershell
git add app/globals.css app/layout.tsx app/not-found.tsx components/layout components/ui
git commit -m "feat: build approved PRO INGEMA design system"
```

### Task 4: Implement the homepage from the approved reference

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/WhyUs.tsx`
- Modify: `components/home/Counters.tsx`
- Modify: `components/home/ServicesPreview.tsx`
- Modify: `components/home/AboutTeaser.tsx`
- Create: `components/home/FieldEvidence.tsx`
- Create: `components/home/WorkProcess.tsx`
- Modify: `components/sections/CTABanner.tsx`
- Modify: `components/sections/ClientsMarquee.tsx`

**Interfaces:**
- Produces: the dark, full-height homepage shown in the approved screenshot and supporting content sections.
- Consumes: verified service arrays, `SITE_MEDIA`, `COMPANY`, shared UI.

- [ ] **Step 1: Implement the hero composition**

Use the real field photograph, dark overlays, technical grid, restrained particles, approved large headline, verified 2011 label, quote CTA, services CTA, and scroll indicator. Keep `min-h-[100dvh]`, balanced wrapping, and mobile-safe spacing.

- [ ] **Step 2: Replace generic equal-card sections**

Build an asymmetric service layout led by geotechnics, laboratory, geophysics, and environmental management. Use real photography and plain, specific descriptions from the supplied documents.

- [ ] **Step 3: Add evidence and process sections**

Use `FieldEvidence` to show field teams and equipment. Use `WorkProcess` for four steps: evaluate, explore, analyze, recommend. Do not claim unsupported project totals.

- [ ] **Step 4: Finish credibility and CTA areas**

Use “since 2011”, laboratory capability, equipment calibration language supplied by the user, and actual contact actions. Remove dead social links and unverified client claims from homepage presentation.

- [ ] **Step 5: Verify and commit**

Run `npm test` and `npm run lint`. Inspect the homepage at desktop width and mobile width before committing.

```powershell
git add app/page.tsx components/home components/sections/CTABanner.tsx components/sections/ClientsMarquee.tsx
git commit -m "feat: redesign PRO INGEMA homepage"
```

### Task 5: Redesign technical service routes

**Files:**
- Modify: `app/servicios/page.tsx`
- Modify: `app/geotecnia/page.tsx`
- Modify: `app/laboratorio/page.tsx`
- Modify: `components/sections/ContactForm.tsx`
- Create: `components/sections/ServiceIndex.tsx`
- Create: `components/sections/TechnicalList.tsx`

**Interfaces:**
- Produces: searchable/scannable service catalog, geotechnical methods page, full laboratory catalog, and validated contact form.
- Consumes: verified `SERVICES`, lab tests, field tests, environmental services, and contact validator.

- [ ] **Step 1: Recompose the general services page**

Add a service index and alternating editorial sections for geotechnics, laboratory, geophysics, designs/special studies, and environmental services. Every section links to contact with a contextual subject.

- [ ] **Step 2: Recompose geotechnics**

Present EMS applications, SPT/DPL/field tests, geophysical methods, and the field-to-report workflow. Use real field imagery and technical norms only where already supplied.

- [ ] **Step 3: Recompose laboratory**

Render all categories from `LAB.SUELOS Y CON.docx`: classification, special soils, aggregates, chemical, fresh concrete, hardened concrete, mortars, and field work. Use compact technical lists instead of repetitive white cards.

- [ ] **Step 4: Wire contact validation**

Use `validateContactForm` in `ContactForm`. Display inline errors, retain values, and construct the existing approved contact action only after validation passes.

- [ ] **Step 5: Verify and commit**

Run `npm test`, `npm run lint`, then inspect `/servicios`, `/geotecnia`, and `/laboratorio` on desktop and mobile.

```powershell
git add app/servicios app/geotecnia app/laboratorio components/sections lib
git commit -m "feat: redesign technical service pages"
```

### Task 6: Redesign corporate and evidence routes

**Files:**
- Modify: `app/nosotros/page.tsx`
- Modify: `app/proyectos/page.tsx`
- Modify: `app/clientes/page.tsx`
- Modify: `app/galeria/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `components/sections/MasonryGallery.tsx`
- Modify: `components/sections/ProjectsGrid.tsx`
- Modify: `lib/data/gallery.ts`
- Modify: `lib/data/projects.ts`
- Modify: `lib/data/clients.ts`
- Modify: `lib/data/blog.ts`
- Modify: `lib/data/team.ts`

**Interfaces:**
- Produces: consistent corporate pages using only verified content and actual media.
- Consumes: global layout, page hero, media catalog, company constants.

- [ ] **Step 1: Remove unsupported claims**

Audit projects, clients, team, and blog data against supplied material. Omit unverified named clients/projects rather than presenting plausible but unsupported entries.

- [ ] **Step 2: Build the company story and evidence pages**

Use the 2011 company history, verified manager data already present, field team photography, and a clear description of multidisciplinary capability.

- [ ] **Step 3: Build the real gallery**

Map selected media into categories for calicatas, SPT, field density, esclerometry, mix design, and geophysics. Ensure every caption and alt text describes the visible work.

- [ ] **Step 4: Finish contact and blog states**

Apply the global visual system, validated contact form, and honest empty/limited content states where no verified article or project data exists.

- [ ] **Step 5: Verify and commit**

Run `npm test` and `npm run lint`. Inspect every route and verify no dead links.

```powershell
git add app/nosotros app/proyectos app/clientes app/galeria app/blog app/contacto components/sections lib/data
git commit -m "feat: redesign corporate and evidence pages"
```

### Task 7: Final verification and visual QA

**Files:**
- Modify only files required by issues discovered during verification.

**Interfaces:**
- Produces: verified production-ready site with no known layout, console, accessibility, or build defects.

- [ ] **Step 1: Run the complete automated suite**

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands exit 0 with no test failures or lint errors.

- [ ] **Step 2: Verify routes in the browser**

Inspect `/`, `/nosotros`, `/servicios`, `/geotecnia`, `/laboratorio`, `/proyectos`, `/clientes`, `/galeria`, `/blog`, `/contacto`, and `/does-not-exist`.

- [ ] **Step 3: Verify desktop behavior**

At desktop width, verify menu open/close, Escape handling, active route state, CTA destinations, gallery images, hover/focus states, full-page scroll, and absence of horizontal overflow.

- [ ] **Step 4: Verify mobile behavior**

At a narrow mobile viewport, verify hero wrapping, 44px touch targets, menu scrolling, image crops, technical lists, contact validation, WhatsApp placement, and footer readability.

- [ ] **Step 5: Inspect console and final diff**

Confirm there are no browser console errors. Run `git diff --check` and `git status --short`; separate intentional redesign files from unrelated pre-existing changes.

- [ ] **Step 6: Commit final fixes**

```powershell
git add app components lib tests public/images/pro-ingema package.json package-lock.json
git commit -m "fix: complete PRO INGEMA responsive QA"
```

Only create this commit when verification produced actual fixes; otherwise do not create an empty commit.
