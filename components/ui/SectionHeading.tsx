import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-brand-green" : "text-brand-green-dark",
          )}
        >
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-brand-dark",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            light ? "text-white/70" : "text-brand-dark/65",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
