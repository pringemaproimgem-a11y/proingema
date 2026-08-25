"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hola PRO INGEMA, quisiera solicitar información sobre sus servicios de ingeniería y geotecnia.",
  );

  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43-.15-.01-.31-.01-.48-.01a.93.93 0 0 0-.67.31c-.23.24-.87.85-.87 2.08s.9 2.41 1.02 2.58c.13.17 1.77 2.71 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
      </svg>
    </motion.a>
  );
}
