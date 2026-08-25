"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight, FileText } from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-brand-dark/95 shadow-lg shadow-black/10 backdrop-blur-md"
          : "bg-gradient-to-b from-brand-dark/70 to-transparent",
      )}
    >
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-10 py-1.5 text-xs text-white/60">
          <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-green transition-colors">
            {COMPANY.email}
          </a>
          <span className="h-3 w-px bg-white/15" />
          <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
            <Phone className="h-3 w-3" />
            {COMPANY.phone}
          </a>
          <span className="h-3 w-px bg-white/15" />
          <span>RUC {COMPANY.ruc}</span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Ir al inicio de PRO INGEMA">
          <BrandLogo placement="navbar" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-white/65 hover:text-white",
                )}
              >
                {active ? (
                  <span className="absolute inset-0 rounded-full bg-white/10" />
                ) : null}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/brochure/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white/90 transition-all hover:-translate-y-0.5 hover:border-white/50 hover:text-white"
          >
            <FileText className="h-4 w-4" />
            Brochure
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,181,26,0.55)] transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            Solicitar Cotización
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/70",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/brochure/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white/85"
              >
                <FileText className="h-4 w-4" />
                Ver Brochure
              </a>
              <Link
                href="/contacto"
                className="rounded-lg bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Solicitar Cotización
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
