"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const SERVICES_OPTIONS = [
  "Estudios Geotécnicos",
  "Mecánica de Suelos",
  "Estudios Geológicos",
  "Estudios Ambientales",
  "Laboratorio de Suelos",
  "Laboratorio de Concreto y Asfalto",
  "Otro",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    const service = form.get("service");
    const message = form.get("message");

    const subject = encodeURIComponent(`Solicitud de cotización — ${service}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nTeléfono: ${phone}\nServicio de interés: ${service}\n\nMensaje:\n${message}`,
    );

    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-green/5 p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-green" />
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-dark">
          ¡Gracias por contactarnos!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-brand-dark/60">
          Se abrió tu cliente de correo con el mensaje prellenado. También puedes
          escribirnos directamente por WhatsApp para una respuesta más rápida.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-dark">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-green"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-dark">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            placeholder="+51 9XX XXX XXX"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-green"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="tucorreo@empresa.com"
          className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-green"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-brand-dark">
          Servicio de interés
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-green"
        >
          <option value="" disabled>
            Selecciona un servicio
          </option>
          {SERVICES_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-dark">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto..."
          className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-green"
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,181,26,0.55)] transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark"
      >
        Enviar Solicitud
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
