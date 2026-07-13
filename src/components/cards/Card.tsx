import type { ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "default" | "outlined" | "elevated";
type CardPadding = "none" | "sm" | "md" | "lg";
type CardRounded = "sm" | "md" | "lg" | "xl";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  rounded?: CardRounded;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: "border border-border bg-surface shadow-sm",
  outlined: "border border-border bg-surface",
  elevated: "bg-surface shadow-md",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const roundedStyles: Record<CardRounded, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
};

function Card({
  children,
  variant = "default",
  padding = "md",
  rounded = "lg",
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        variantStyles[variant],
        paddingStyles[padding],
        roundedStyles[rounded],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
