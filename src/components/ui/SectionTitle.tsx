import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

function SectionTitle({
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        "space-y-1",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-base text-text-secondary",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
