import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const SERVICE_LINKS = [
  { href: "/servicios", label: "Estudios Geotécnicos" },
  { href: "/servicios", label: "Mecánica de Suelos" },
  { href: "/servicios", label: "Estudios Geológicos" },
  { href: "/servicios", label: "Estudios Ambientales" },
  { href: "/laboratorio", label: "Laboratorio de Suelos" },
  { href: "/laboratorio", label: "Laboratorio de Concreto y Asfalto" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-30" />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="Ir al inicio de PRO INGEMA">
              <BrandLogo placement="footer" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {COMPANY.fullName}. Soluciones integrales en geotecnia, estudios de
              suelos, laboratorio de materiales y consultoría de ingeniería desde{" "}
              {COMPANY.foundedYear}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Navegación
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Servicios
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contacto
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                {COMPANY.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-green" />
                <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-brand-green">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-green" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-green">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PRO INGEMA S.A.C. — RUC {COMPANY.ruc}. Todos los derechos reservados.
          </p>
          <p>Gerente General: {COMPANY.manager} — CIP {COMPANY.cip}</p>
        </div>
      </Container>
    </footer>
  );
}
