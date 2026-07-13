import clsx from "clsx";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
  className?: string;
}

function Header({
  title = "Parental Legacy Calculator",
  subtitle,
  isDark = false,
  onToggleTheme,
  className,
}: HeaderProps) {
  return (
    <header className={clsx("border-b border-border bg-surface", className)}>
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

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={clsx(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors",
              "hover:bg-surface-muted hover:text-text",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
            )}
          >
            <span
              className="transition-transform duration-300"
              style={{ transform: isDark ? "rotate(0deg)" : "rotate(180deg)" }}
            >
              {isDark ? (
                <HiOutlineMoon className="h-5 w-5" />
              ) : (
                <HiOutlineSun className="h-5 w-5" />
              )}
            </span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
