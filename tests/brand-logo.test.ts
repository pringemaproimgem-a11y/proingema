import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { BrandLogo } from "../components/ui/BrandLogo.ts";

test("el logo del encabezado renderiza el PNG oficial completo", () => {
  const markup = decodeURIComponent(
    renderToStaticMarkup(createElement(BrandLogo, { placement: "navbar" })),
  );

  assert.match(markup, /alt="Logotipo oficial de PRO INGEMA S\.A\.C\."/);
  assert.match(markup, /\/images\/pro-ingema\/logo-pro-ingema\.png/);
  assert.match(markup, /width="1182"/);
  assert.match(markup, /height="1331"/);
  assert.match(markup, /h-16 w-auto object-contain sm:h-20/);
});

test("el logo del pie conserva el PNG y usa una presentación mayor", () => {
  const markup = decodeURIComponent(
    renderToStaticMarkup(createElement(BrandLogo, { placement: "footer" })),
  );

  assert.match(markup, /alt="Logotipo oficial de PRO INGEMA S\.A\.C\."/);
  assert.match(markup, /\/images\/pro-ingema\/logo-pro-ingema\.png/);
  assert.match(markup, /width="1182"/);
  assert.match(markup, /height="1331"/);
  assert.match(markup, /h-32 w-auto object-contain/);
});
