import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    description,
    error,
    required,
    disabled,
    className,
    id: idProp,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={clsx("space-y-1.5", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text">
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <p id={descriptionId} className="text-sm text-text-muted">
          {description}
        </p>
      )}

      <input
        ref={ref}
        id={id}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={clsx(descriptionId, errorId) || undefined}
        className={clsx(
          "block w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text",
          "placeholder:text-text-muted",
          "transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-400 focus-visible:outline-red-500"
            : "border-border hover:border-border-hover",
        )}
        {...rest}
      />

      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
