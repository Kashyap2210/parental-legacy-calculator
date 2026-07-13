import clsx from "clsx";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

function Header({
  title = "Parental Legacy Calculator",
  subtitle,
  className,
}: HeaderProps) {
  return (
    <header
      role="banner"
      className={clsx("border-b border-border bg-surface", className)}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-text transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label={`${title} — Home`}
          >
            {title}
          </a>
          {subtitle && (
            <span
              className="hidden text-xs font-medium text-text-muted sm:inline-block"
              aria-hidden="true"
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
