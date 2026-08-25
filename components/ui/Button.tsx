import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "light" | "ghost";
  size?: "md" | "lg";
  className?: string;
  icon?: ReactNode;
};

const VARIANTS: Record<string, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-dark shadow-[0_8px_24px_-8px_rgba(0,181,26,0.55)]",
  secondary:
    "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-[0_8px_24px_-8px_rgba(247,147,30,0.55)]",
  outline:
    "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
  light: "bg-white text-brand-green-dark hover:bg-white/90",
  ghost: "text-brand-dark hover:text-brand-green-dark",
};

const SIZES: Record<string, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon,
  target,
}: ButtonBaseProps & { href: string; target?: string }) {
  const isExternal = href.startsWith("http") || target === "_blank";
  const Comp: typeof Link | "a" = href.startsWith("/") ? Link : "a";

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (Comp === Link) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
      {icon}
    </a>
  );
}
