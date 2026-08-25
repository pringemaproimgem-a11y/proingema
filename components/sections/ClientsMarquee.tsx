import { CLIENTS } from "@/lib/data/clients";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { cn } from "@/lib/utils";

export function ClientsMarquee({ dark = true }: { dark?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden py-4 motion-reduce:overflow-x-auto"
      aria-label="Instituciones clientes"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r sm:w-28 motion-reduce:hidden",
          dark ? "from-brand-dark to-transparent" : "from-white to-transparent",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l sm:w-28 motion-reduce:hidden",
          dark ? "from-brand-dark to-transparent" : "from-white to-transparent",
        )}
      />

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((loopIndex) => (
          <div
            key={loopIndex}
            className="flex gap-4 pr-4"
            role={loopIndex === 0 ? "list" : undefined}
            aria-hidden={loopIndex === 1 ? true : undefined}
          >
            {CLIENTS.map((client) => (
              <div
                key={`${loopIndex}-${client.logo}`}
                role={loopIndex === 0 ? "listitem" : undefined}
                className="flex h-24 min-w-[180px] items-center justify-center rounded-2xl bg-white px-5 py-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] sm:h-28 sm:min-w-[220px] sm:px-6"
              >
                <ClientLogo client={client} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
