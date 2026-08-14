# Client Logo Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the provisional client-name cards with a smooth, accessible carousel of the seven supplied institutional logos on both the home page and `/clientes`.

**Architecture:** A reproducible PowerShell utility trims transparent padding and downsizes each source PNG without altering its artwork. `lib/data/clients.ts` becomes the canonical logo manifest, a testable `ClientLogo` component renders optimized images, and the existing shared `ClientsMarquee` duplicates one semantic list for a seamless loop.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4, Node test runner, Windows System.Drawing.

## Global Constraints

- Use exactly the seven supplied PNG logos in their original colors and proportions.
- Crop only fully transparent outer pixels, add 64 px transparent source padding, then resize the longest edge to 900 px.
- Do not redraw, recolor, stretch, or generatively modify any logo.
- Show the shared carousel on the home page and `/clientes`; do not change the lower client grid.
- Use soft white cards, `object-contain`, responsive sizing, descriptive alt text, and no visible duplicate labels.
- Keep the existing 32-second continuous marquee, pause it on hover, and stop animation under `prefers-reduced-motion` while allowing manual horizontal scrolling.
- Preserve all unrelated local changes in the dirty worktree.

---

### Task 1: Prepare canonical client-logo assets and manifest

**Files:**
- Create: `scripts/prepare-client-logos.ps1`
- Create: `public/images/clients/plan-copesco.png`
- Create: `public/images/clients/gore-cusco.png`
- Create: `public/images/clients/provias-descentralizado.png`
- Create: `public/images/clients/gore-apurimac.png`
- Create: `public/images/clients/pescs.png`
- Create: `public/images/clients/gore-madre-de-dios.png`
- Create: `public/images/clients/ima.png`
- Modify: `lib/data/clients.ts`
- Modify: `tests/site-content.test.ts`

**Interfaces:**
- Consumes: `D:\brochure pro ingema\logos\1.png` through `7.png`.
- Produces: `Client` objects with `name`, `shortName`, `logo`, `logoAlt`, `logoWidth`, and `logoHeight` plus seven public RGBA PNG assets.

- [ ] **Step 1: Write the failing client-logo manifest test**

Add this import to `tests/site-content.test.ts`:

```ts
import { CLIENTS } from "../lib/data/clients.ts";
```

Append this test:

```ts
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
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```powershell
node --test --test-name-pattern="siete clientes usan logos" tests/site-content.test.ts
```

Expected: FAIL because the current `Client` type has no logo fields, contains eight clients, and the public client-logo files do not exist.

- [ ] **Step 3: Create the deterministic image-preparation utility**

Create `scripts/prepare-client-logos.ps1` with a C# helper compiled through `Add-Type`. The helper must:

```csharp
public static void Prepare(string source, string destination, int padding, int maxEdge)
{
    using var original = new Bitmap(source);
    using var argb = new Bitmap(original.Width, original.Height, PixelFormat.Format32bppArgb);
    using (var canvas = Graphics.FromImage(argb))
    {
        canvas.Clear(Color.Transparent);
        canvas.DrawImageUnscaled(original, 0, 0);
    }

    Rectangle art = GetAlphaBounds(argb);
    Rectangle crop = Rectangle.FromLTRB(
        Math.Max(0, art.Left - padding),
        Math.Max(0, art.Top - padding),
        Math.Min(argb.Width, art.Right + padding),
        Math.Min(argb.Height, art.Bottom + padding)
    );
    double scale = Math.Min(1.0, (double)maxEdge / Math.Max(crop.Width, crop.Height));
    int width = (int)Math.Round(crop.Width * scale);
    int height = (int)Math.Round(crop.Height * scale);

    using var output = new Bitmap(width, height, PixelFormat.Format32bppArgb);
    using (var graphics = Graphics.FromImage(output))
    {
        graphics.Clear(Color.Transparent);
        graphics.CompositingQuality = CompositingQuality.HighQuality;
        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
        graphics.DrawImage(argb, new Rectangle(0, 0, width, height), crop, GraphicsUnit.Pixel);
    }
    Directory.CreateDirectory(Path.GetDirectoryName(destination));
    output.Save(destination, ImageFormat.Png);
}
```

Implement `GetAlphaBounds(Bitmap bitmap)` with `LockBits(..., PixelFormat.Format32bppArgb)`, `Marshal.Copy`, and an alpha-byte scan at `row + x * 4 + 3`; throw when the image has no nontransparent pixels.

The PowerShell mapping must be exact:

```powershell
$logos = @(
  @{ Source = '1.png'; Destination = 'plan-copesco.png' },
  @{ Source = '2.png'; Destination = 'gore-cusco.png' },
  @{ Source = '3.png'; Destination = 'provias-descentralizado.png' },
  @{ Source = '4.png'; Destination = 'gore-apurimac.png' },
  @{ Source = '5.png'; Destination = 'pescs.png' },
  @{ Source = '6.png'; Destination = 'gore-madre-de-dios.png' },
  @{ Source = '7.png'; Destination = 'ima.png' }
)

foreach ($logo in $logos) {
  [ClientLogoPreparer]::Prepare(
    (Join-Path 'D:\brochure pro ingema\logos' $logo.Source),
    (Join-Path 'D:\niki\public\images\clients' $logo.Destination),
    64,
    900
  )
}
```

- [ ] **Step 4: Generate and validate the seven assets**

Run:

```powershell
& 'D:\niki\scripts\prepare-client-logos.ps1'
Get-ChildItem 'D:\niki\public\images\clients' -Filter '*.png' | Select-Object Name,Length
```

Expected: exactly seven nonempty PNG files with the names listed above.

- [ ] **Step 5: Replace the client manifest with the seven mapped institutions**

Use this exact interface and values in `lib/data/clients.ts`:

```ts
export type Client = {
  name: string;
  shortName: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
};

export const CLIENTS: Client[] = [
  { name: "Plan COPESCO", shortName: "Plan COPESCO", logo: "/images/clients/plan-copesco.png", logoAlt: "Logotipo de Plan COPESCO", logoWidth: 900, logoHeight: 356 },
  { name: "Gobierno Regional Cusco", shortName: "GORE Cusco", logo: "/images/clients/gore-cusco.png", logoAlt: "Logotipo del Gobierno Regional Cusco", logoWidth: 900, logoHeight: 900 },
  { name: "Provías Descentralizado", shortName: "Provías", logo: "/images/clients/provias-descentralizado.png", logoAlt: "Logotipo de Provías Descentralizado", logoWidth: 900, logoHeight: 703 },
  { name: "Gobierno Regional Apurímac", shortName: "GORE Apurímac", logo: "/images/clients/gore-apurimac.png", logoAlt: "Logotipo del Gobierno Regional Apurímac", logoWidth: 782, logoHeight: 900 },
  { name: "Proyecto Especial Sierra Centro Sur", shortName: "PESCS", logo: "/images/clients/pescs.png", logoAlt: "Logotipo del Proyecto Especial Sierra Centro Sur PESCS", logoWidth: 687, logoHeight: 900 },
  { name: "Gobierno Regional Madre de Dios", shortName: "GORE Madre de Dios", logo: "/images/clients/gore-madre-de-dios.png", logoAlt: "Logotipo del Gobierno Regional Madre de Dios", logoWidth: 900, logoHeight: 876 },
  { name: "Instituto de Manejo de Agua y Medio Ambiente", shortName: "IMA", logo: "/images/clients/ima.png", logoAlt: "Logotipo del Instituto de Manejo de Agua y Medio Ambiente IMA", logoWidth: 900, logoHeight: 521 },
];
```

- [ ] **Step 6: Run the focused test to verify it passes**

Run the command from Step 2.

Expected: PASS.

- [ ] **Step 7: Commit the asset and manifest deliverable**

```powershell
git add -- 'scripts/prepare-client-logos.ps1' 'public/images/clients' 'lib/data/clients.ts' 'tests/site-content.test.ts'
git commit -m "feat: add official client logo assets"
```

---

### Task 2: Build a tested reusable client-logo renderer

**Files:**
- Create: `components/ui/ClientLogo.ts`
- Create: `tests/client-logo.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `Client` from `lib/data/clients.ts`.
- Produces: `ClientLogo({ client }: { client: Client })`, rendering a responsive optimized `<img>` with the client's canonical asset and alt text.

- [ ] **Step 1: Write the failing rendered-markup test**

Create `tests/client-logo.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { ClientLogo } from "../components/ui/ClientLogo.ts";
import { CLIENTS } from "../lib/data/clients.ts";

test("ClientLogo renderiza el activo, dimensiones y texto alternativo del cliente", () => {
  const client = CLIENTS[0];
  const markup = decodeURIComponent(
    renderToStaticMarkup(createElement(ClientLogo, { client })),
  );

  assert.match(markup, new RegExp(client.logo.replaceAll("/", "\\/")));
  assert.match(markup, new RegExp(`alt="${client.logoAlt}"`));
  assert.match(markup, new RegExp(`width="${client.logoWidth}"`));
  assert.match(markup, new RegExp(`height="${client.logoHeight}"`));
  assert.match(markup, /h-16 w-full object-contain sm:h-20/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/client-logo.test.ts`

Expected: FAIL because `components/ui/ClientLogo.ts` does not exist.

- [ ] **Step 3: Implement the minimal renderer**

Create `components/ui/ClientLogo.ts`:

```ts
import { createElement } from "react";
import { getImageProps } from "next/image.js";
import type { Client } from "../../lib/data/clients.ts";

export function ClientLogo({ client }: { client: Client }) {
  const { props } = getImageProps({
    src: client.logo,
    alt: client.logoAlt,
    width: client.logoWidth,
    height: client.logoHeight,
    sizes: "(min-width: 640px) 172px, 140px",
    loading: "lazy",
    className: "h-16 w-full object-contain sm:h-20",
  });

  return createElement("img", props);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/client-logo.test.ts`

Expected: PASS.

- [ ] **Step 5: Include the new test in the default suite**

Set the `test` script in `package.json` to:

```json
"test": "node --test tests/brand-logo.test.ts tests/client-logo.test.ts tests/site-content.test.ts tests/contact-form.test.ts"
```

- [ ] **Step 6: Commit the renderer deliverable**

```powershell
git add -- 'components/ui/ClientLogo.ts' 'tests/client-logo.test.ts' 'package.json'
git commit -m "feat: add reusable client logo renderer"
```

---

### Task 3: Replace the provisional cards with the accessible moving carousel

**Files:**
- Modify: `components/sections/ClientsMarquee.tsx`

**Interfaces:**
- Consumes: `CLIENTS` and `ClientLogo`.
- Produces: one accessible primary sequence plus one `aria-hidden` duplicate sequence for a seamless loop.

- [ ] **Step 1: Verify the current rendered page lacks the new carousel assets**

With the local dev server running, execute:

```powershell
$home = (Invoke-WebRequest 'http://localhost:3000/' -UseBasicParsing).Content
if ($home -match 'plan-copesco\.png') { throw 'Expected the pre-change page to lack the new logo carousel' }
```

Expected: command exits successfully because the current marquee still renders generic building icons.

- [ ] **Step 2: Replace `ClientsMarquee` with logo cards**

Remove the `Building2` import, add:

```tsx
import { ClientLogo } from "@/components/ui/ClientLogo";
```

Keep the existing side gradients. Replace the animated list with:

```tsx
<div className="group relative overflow-hidden py-4 motion-reduce:overflow-x-auto">
  {/* existing left and right gradient overlays */}
  <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
    {[0, 1].map((loopIndex) => (
      <div
        key={loopIndex}
        className="flex gap-4 pr-4"
        aria-hidden={loopIndex === 1 ? true : undefined}
      >
        {CLIENTS.map((client) => (
          <div
            key={`${loopIndex}-${client.logo}`}
            className={cn(
              "flex h-24 min-w-[180px] items-center justify-center rounded-2xl border bg-white/95 px-5 py-4 shadow-sm sm:h-28 sm:min-w-[220px] sm:px-6",
              dark ? "border-white/10" : "border-black/10",
            )}
          >
            <ClientLogo client={client} />
          </div>
        ))}
      </div>
    ))}
  </div>
</div>
```

Do not add client-name text to the cards; the official lockups already contain names and the primary images provide descriptive alt text.

- [ ] **Step 3: Verify both routes render every logo**

Run:

```powershell
$routes = @('http://localhost:3000/', 'http://localhost:3000/clientes')
$logos = @('plan-copesco.png','gore-cusco.png','provias-descentralizado.png','gore-apurimac.png','pescs.png','gore-madre-de-dios.png','ima.png')
foreach ($route in $routes) {
  $html = (Invoke-WebRequest $route -UseBasicParsing).Content
  foreach ($logo in $logos) {
    if ($html -notmatch [regex]::Escape($logo)) { throw "$logo no aparece en $route" }
  }
}
```

Expected: exits with code 0.

- [ ] **Step 4: Run automated verification**

Run:

```powershell
npm test
npx eslint lib/data/clients.ts components/ui/ClientLogo.ts components/sections/ClientsMarquee.tsx tests/client-logo.test.ts tests/site-content.test.ts
npm run build
```

Expected: all tests pass, targeted ESLint exits with code 0, and the Next.js production build completes.

- [ ] **Step 5: Perform responsive visual verification**

Inspect `/` and `/clientes` at approximately 390 px and 1440 px viewport widths. Confirm:

- All seven logos are legible and centered on equal white cards.
- Wide and tall logos have comparable visual weight without clipping or distortion.
- The carousel loops without a visible jump and pauses on pointer hover.
- Reduced-motion mode stops animation and allows horizontal scrolling.
- Side gradients blend with the dark background and cards do not overflow vertically.

- [ ] **Step 6: Commit the carousel deliverable**

```powershell
git add -- 'components/sections/ClientsMarquee.tsx'
git commit -m "feat: show official logos in client carousel"
```
