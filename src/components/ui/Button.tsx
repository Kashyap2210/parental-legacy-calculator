import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
  secondary:
    "bg-primary-100 text-primary-700 hover:bg-primary-200 active:bg-primary-300",
  outline:
    "border border-border bg-surface text-text hover:bg-surface-muted active:bg-surface-alt",
  ghost:
    "text-text-secondary hover:bg-surface-muted hover:text-text active:bg-surface-alt",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-12 px-4 text-sm gap-2",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

function Button({
  variant = "primary",
  size = "md",
  type = "button",
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
