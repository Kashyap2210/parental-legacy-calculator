import clsx from "clsx";

type SkeletonVariant = "card" | "row" | "chart" | "text";

interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

function LoadingSkeleton({
  variant = "card",
  className,
}: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-skeleton rounded-lg bg-surface-muted",
        variant === "card" && "h-40 w-full",
        variant === "row" && "h-12 w-full",
        variant === "chart" && "h-64 w-full",
        variant === "text" && "h-4 w-3/4",
        className,
      )}
      role="status"
    />
  );
}

export default LoadingSkeleton;
