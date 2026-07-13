import clsx from "clsx";

interface EmptyStateProps {
  message: string;
  description?: string;
  className?: string;
}

function EmptyState({ message, description, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
      role="status"
    >
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted"
        aria-hidden="true"
      >
        <svg
          className="h-8 w-8 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-text">{message}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-text-muted">{description}</p>
      )}
    </div>
  );
}

export default EmptyState;
