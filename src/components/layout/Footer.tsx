import clsx from "clsx";

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={clsx("border-t border-border bg-surface-alt", className)}
    >
      <div className="mx-auto flex h-12 max-w-[var(--container-max)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-text-muted">
          <span className="font-medium">Parental Legacy Calculator</span> &copy;{" "}
          {year}
          <span className="mx-1.5" aria-hidden="true">
            &middot;
          </span>
          Built with <span className="font-medium">React</span> &amp;{" "}
          <span className="font-medium">TypeScript</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
