import type { ReactNode } from "react";
import clsx from "clsx";
import Card from "@/components/cards/Card";

type AccentColor = "primary" | "secondary" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  accentColor?: AccentColor;
  loading?: boolean;
  className?: string;
}

const accentStyles: Record<
  AccentColor,
  { bg: string; text: string; icon: string }
> = {
  primary: {
    bg: "bg-primary-50",
    text: "text-primary-700",
    icon: "text-primary-500",
  },
  secondary: {
    bg: "bg-secondary-50",
    text: "text-secondary-700",
    icon: "text-secondary-500",
  },
  neutral: {
    bg: "bg-surface-muted",
    text: "text-text",
    icon: "text-text-muted",
  },
};

function StatCard({
  title,
  value,
  icon,
  accentColor = "primary",
  loading = false,
  className,
}: StatCardProps) {
  const accent = accentStyles[accentColor];

  return (
    <Card padding="lg" className={clsx("relative overflow-hidden", className)}>
      {icon && (
        <div
          className={clsx(
            "mb-3 flex h-10 w-10 items-center justify-center rounded-lg",
            accent.bg,
          )}
          aria-hidden="true"
        >
          <span className={clsx("text-xl", accent.icon)}>{icon}</span>
        </div>
      )}
      <dt className="text-sm font-medium text-text-secondary">{title}</dt>
      <dd
        className={clsx("mt-1 text-3xl font-bold tracking-tight", accent.text)}
      >
        {loading ? (
          <span
            className="inline-block h-8 w-20 animate-skeleton rounded bg-surface-muted"
            aria-label="Loading value"
          />
        ) : (
          value
        )}
      </dd>
    </Card>
  );
}

export default StatCard;
