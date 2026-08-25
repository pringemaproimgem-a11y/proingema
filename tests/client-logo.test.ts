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

  assert.ok(markup.includes(client.logo));
  assert.ok(markup.includes(`alt="${client.logoAlt}"`));
  assert.ok(markup.includes(`width="${client.logoWidth}"`));
  assert.ok(markup.includes(`height="${client.logoHeight}"`));
  assert.match(markup, /h-16 w-full object-contain sm:h-20/);
});
