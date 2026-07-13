import type { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "success" | "warning" | "info" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  info: "bg-primary-50 text-primary-700 ring-primary-600/20",
  neutral: "bg-surface-muted text-text-secondary ring-border",
};

function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
