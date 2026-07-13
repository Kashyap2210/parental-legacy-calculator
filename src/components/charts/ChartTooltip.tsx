import clsx from "clsx";

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatter?: (value: number) => string;
}

const DEFAULT_FORMATTER = (value: number): string => value.toFixed(3);

function ChartTooltip({
  active,
  payload,
  label,
  formatter = DEFAULT_FORMATTER,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        "rounded-lg border border-border bg-surface px-3 py-2 shadow-md",
        "text-sm",
      )}
      role="tooltip"
    >
      {label && <p className="mb-1 font-semibold text-text-primary">{label}</p>}
      <div className="space-y-0.5">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="text-text-secondary">{item.name}:</span>
            <span className="font-medium tabular-nums text-text-primary">
              {formatter(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartTooltip;
