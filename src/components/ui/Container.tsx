import type { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        "[max-width:var(--container-max)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
