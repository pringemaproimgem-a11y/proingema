import assert from "node:assert/strict";
import test from "node:test";

import { validateContactForm } from "../lib/contact-form.ts";

test("acepta una solicitud de contacto completa", () => {
  assert.deepEqual(
    validateContactForm({
      name: "María Quispe",
      email: "maria@example.com",
      phone: "+51 987 654 321",
      service: "Estudio geotécnico",
      message: "Necesito una cotización para un estudio de suelos en Cusco.",
    }),
    {},
  );
});

test("rechaza nombre, correo y mensaje inválidos con errores por campo", () => {
  assert.deepEqual(
    validateContactForm({
      name: "A",
      email: "correo-invalido",
      phone: "",
      service: "",
      message: "corto",
    }),
    {
      name: "Ingresa tu nombre completo.",
      email: "Ingresa un correo válido.",
      message: "Cuéntanos un poco más sobre tu proyecto.",
    },
  );
});

test("el teléfono es opcional, pero se valida cuando se proporciona", () => {
  assert.deepEqual(
    validateContactForm({
      name: "José Huamán",
      email: "jose@example.com",
      phone: "123",
      service: "Laboratorio de materiales",
      message: "Deseo consultar por ensayos de control de calidad para una obra.",
    }),
    { phone: "Ingresa un teléfono válido." },
  );
});
