import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctate con PRO INGEMA S.A.C. para solicitar una cotización de estudios geotécnicos, mecánica de suelos o servicios de laboratorio en Cusco, Perú.",
};

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Ubicación",
    value: COMPANY.address,
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phoneHref}`,
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lunes a Viernes: 8:00 a.m. – 6:00 p.m.",
  },
];

export default function ContactoPage() {
  const whatsappMessage = encodeURIComponent(
    "Hola PRO INGEMA, quisiera solicitar información sobre sus servicios de ingeniería y geotecnia.",
  );

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre tu proyecto"
        description="Escríbenos y un especialista de PRO INGEMA S.A.C. se pondrá en contacto contigo a la brevedad."
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-brand-dark">
                  Información de contacto
                </h2>
                <p className="mt-3 text-brand-dark/65">
                  Comunícate con nosotros por el medio de tu preferencia. También
                  puedes escribirnos directamente por WhatsApp para una atención inmediata.
                </p>
              </Reveal>

              <div className="mt-8 space-y-5">
                {CONTACT_ITEMS.map((item) => (
                  <Reveal key={item.label}>
                    <div className="flex items-start gap-4 rounded-2xl border border-black/5 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green-dark">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="mt-1 block text-sm font-medium text-brand-dark hover:text-brand-green-dark">
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-medium text-brand-dark">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15}>
                <a
                  href={`https://wa.me/${COMPANY.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Escríbenos por WhatsApp
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-black/5 p-7 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] sm:p-9">
                <h2 className="font-display text-2xl font-bold text-brand-dark">
                  Solicita tu cotización
                </h2>
                <p className="mt-2 text-sm text-brand-dark/60">
                  Completa el formulario y te contactaremos en menos de 24 horas hábiles.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f8f7] pb-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]">
              <iframe
                title="Ubicación de PRO INGEMA S.A.C. en Cusco, Perú"
                src="https://www.google.com/maps?q=Cusco,Peru&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
