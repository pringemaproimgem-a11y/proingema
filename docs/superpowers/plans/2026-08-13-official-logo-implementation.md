# Official PRO INGEMA Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the provisional `PI`/text branding in the navbar and footer with the supplied official white transparent PNG.

**Architecture:** Keep one canonical public asset at `/images/pro-ingema/logo-pro-ingema.png` and render it with Next.js `Image` in both layout components. Preserve the source aspect ratio with responsive height utilities and verify the integration through source-level tests plus the existing lint and build checks.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4, Node test runner.

## Global Constraints

- Preserve the supplied PNG unchanged: white artwork, transparent background, original composition, and 1182 × 1331 dimensions.
- Apply the complete logo in both `Navbar.tsx` and `Footer.tsx`.
- Use `object-contain`; do not crop, stretch, recolor, or redraw the logo.
- Do not alter navigation, copy, animation behavior, colors, or unrelated layout structure.
- Maintain an accessible descriptive `alt` value and preserve the navbar link to `/`.

---

### Task 1: Canonical logo asset and navbar integration

**Files:**
- Replace: `public/images/pro-ingema/logo-pro-ingema.png`
- Modify: `components/layout/Navbar.tsx:3-4,58-72`
- Modify: `tests/site-content.test.ts:1-4,46-55`

**Interfaces:**
- Consumes: the user-supplied `C:\Users\jef_o\Downloads\logo proingema.png` PNG.
- Produces: public asset URL `/images/pro-ingema/logo-pro-ingema.png` and a responsive navbar brand image.

- [ ] **Step 1: Write the failing navbar integration test**

Update the filesystem import in `tests/site-content.test.ts`:

```ts
import { existsSync, readFileSync } from "node:fs";
```

Append this test:

```ts
test("el encabezado usa el logotipo oficial en lugar de la marca provisional", () => {
  const navbarSource = readFileSync(
    path.join(process.cwd(), "components", "layout", "Navbar.tsx"),
    "utf8",
  );

  assert.match(navbarSource, /from "next\/image"/);
  assert.match(navbarSource, /logo-pro-ingema\.png/);
  assert.doesNotMatch(navbarSource, />\s*PI\s*</);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --test-name-pattern="encabezado usa el logotipo oficial"`

Expected: FAIL because `Navbar.tsx` does not import `next/image`, does not reference the official PNG, and still renders `PI`.

- [ ] **Step 3: Replace the canonical public asset**

Run in PowerShell:

```powershell
Copy-Item -LiteralPath 'C:\Users\jef_o\Downloads\logo proingema.png' -Destination 'D:\niki\public\images\pro-ingema\logo-pro-ingema.png' -Force
```

Validate the copied file without modifying it:

```powershell
Add-Type -AssemblyName System.Drawing
$logo = [System.Drawing.Bitmap]::FromFile('D:\niki\public\images\pro-ingema\logo-pro-ingema.png')
[PSCustomObject]@{ Width = $logo.Width; Height = $logo.Height; PixelFormat = $logo.PixelFormat.ToString() }
$logo.Dispose()
```

Expected: `Width=1182`, `Height=1331`, `PixelFormat=Format32bppArgb`.

- [ ] **Step 4: Replace the provisional navbar lockup**

Add the import:

```tsx
import Image from "next/image";
```

Replace only the current home `Link` containing the green `PI` block and the two text spans with:

```tsx
<Link href="/" className="flex shrink-0 items-center" aria-label="Ir al inicio de PRO INGEMA">
  <Image
    src="/images/pro-ingema/logo-pro-ingema.png"
    alt="Logotipo oficial de PRO INGEMA S.A.C."
    width={1182}
    height={1331}
    priority
    sizes="(min-width: 640px) 71px, 57px"
    className="h-16 w-auto object-contain sm:h-20"
  />
</Link>
```

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `npm test -- --test-name-pattern="encabezado usa el logotipo oficial"`

Expected: PASS.

- [ ] **Step 6: Commit the navbar deliverable**

```powershell
git add -- 'public/images/pro-ingema/logo-pro-ingema.png' 'components/layout/Navbar.tsx' 'tests/site-content.test.ts'
git commit -m "feat: use official logo in navbar"
```

---

### Task 2: Footer integration and full verification

**Files:**
- Modify: `components/layout/Footer.tsx:1-4,37-49`
- Modify: `tests/site-content.test.ts`

**Interfaces:**
- Consumes: canonical public asset URL `/images/pro-ingema/logo-pro-ingema.png` produced by Task 1.
- Produces: a larger footer rendering of the same complete logo and regression coverage for both layout locations.

- [ ] **Step 1: Write the failing footer integration test**

Append this test to `tests/site-content.test.ts`:

```ts
test("el pie usa el mismo logotipo oficial y elimina la marca provisional", () => {
  const footerSource = readFileSync(
    path.join(process.cwd(), "components", "layout", "Footer.tsx"),
    "utf8",
  );

  assert.match(footerSource, /from "next\/image"/);
  assert.match(footerSource, /logo-pro-ingema\.png/);
  assert.doesNotMatch(footerSource, />\s*PI\s*</);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --test-name-pattern="pie usa el mismo logotipo oficial"`

Expected: FAIL because `Footer.tsx` still renders the provisional block and text.

- [ ] **Step 3: Replace the provisional footer lockup**

Add the import:

```tsx
import Image from "next/image";
```

Replace only the current branding `div` containing the `PI` block and company-name text with:

```tsx
<Link href="/" className="inline-flex" aria-label="Ir al inicio de PRO INGEMA">
  <Image
    src="/images/pro-ingema/logo-pro-ingema.png"
    alt="Logotipo oficial de PRO INGEMA S.A.C."
    width={1182}
    height={1331}
    sizes="128px"
    className="h-32 w-auto object-contain"
  />
</Link>
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- --test-name-pattern="pie usa el mismo logotipo oficial"`

Expected: PASS.

- [ ] **Step 5: Run complete automated verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all tests pass, ESLint exits with code 0, and the production build completes successfully.

- [ ] **Step 6: Perform responsive visual verification**

Start the site with `npm run dev` and inspect `/` at approximately 390 px and 1440 px viewport widths.

Confirm:

- The complete white logo is visible against the dark navbar and footer.
- The PNG background is transparent; no black or white rectangle appears.
- The artwork is not stretched or cropped.
- The navbar links, contact button, and mobile menu remain usable without overlap.
- The footer grid does not overflow horizontally.

- [ ] **Step 7: Commit the footer deliverable**

```powershell
git add -- 'components/layout/Footer.tsx' 'tests/site-content.test.ts'
git commit -m "feat: use official logo in footer"
```
