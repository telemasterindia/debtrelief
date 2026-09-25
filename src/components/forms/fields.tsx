import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui/icon";

const control =
  "block w-full rounded-[var(--radius-control)] border-2 bg-white px-4 text-lg text-ink placeholder:text-[#6b7789] transition-[border-color,box-shadow] focus:border-brand-600 focus:shadow-[0_0_0_4px_rgb(19_122_61/0.18)] focus:outline-none";

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-2.5 flex items-start gap-2 text-[1.0625rem] font-medium text-danger-700">
      <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export function Hint({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={`${id}-hint`} className="mt-1.5 text-[1.0625rem] leading-snug text-muted">
      {children}
    </p>
  );
}

type TextFieldProps = { id: string; label: string; hint?: ReactNode; error?: string; optional?: boolean } & InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, hint, error, optional, className, ...rest },
  ref,
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-lg font-semibold text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-muted">(optional)</span>}
      </label>
      <Hint id={id}>{hint}</Hint>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "mt-2.5 min-h-14", error ? "border-danger-700" : "border-line-strong")}
        {...rest}
      />
      <FieldError id={id} message={error} />
    </div>
  );
});

type TextAreaProps = { id: string; label: string; hint?: ReactNode; error?: string; optional?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { id, label, hint, error, optional, className, ...rest },
  ref,
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-lg font-semibold text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-muted">(optional)</span>}
      </label>
      <Hint id={id}>{hint}</Hint>
      <textarea
        ref={ref}
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "mt-2.5 py-3 leading-relaxed", error ? "border-danger-700" : "border-line-strong")}
        {...rest}
      />
      <FieldError id={id} message={error} />
    </div>
  );
});

type SelectProps = { id: string; label: string; hint?: ReactNode; error?: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>;

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(function SelectField(
  { id, label, hint, error, className, children, ...rest },
  ref,
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-lg font-semibold text-ink">
        {label}
      </label>
      <Hint id={id}>{hint}</Hint>
      <div className="relative mt-2.5">
        <select
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(control, "min-h-14 appearance-none pr-12", error ? "border-danger-700" : "border-line-strong")}
          {...rest}
        >
          {children}
        </select>
        <Icon name="chevronDown" className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-ink" />
      </div>
      <FieldError id={id} message={error} />
    </div>
  );
});

/** Large, clearly-bordered radio options inside a fieldset with a visible legend. */
export function RadioGroup({
  id,
  legend,
  hint,
  error,
  options,
  columns = 2,
  inputProps,
}: {
  id: string;
  legend: string;
  hint?: ReactNode;
  error?: string;
  options: readonly { value: string; label: string }[];
  columns?: 1 | 2 | 3;
  inputProps: (value: string) => InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
}) {
  return (
    <fieldset id={id} aria-describedby={describedBy(id, hint, error)} aria-invalid={error ? true : undefined}>
      <legend className="text-lg font-semibold text-ink">{legend}</legend>
      <Hint id={id}>{hint}</Hint>
      <div className={cn("mt-3 grid gap-3", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-3")}>
        {options.map((o, i) => {
          const optionId = `${id}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={optionId}
              className={cn(
                "flex min-h-14 cursor-pointer items-center gap-3.5 rounded-[var(--radius-control)] border-2 bg-white px-4 py-3 text-lg text-ink transition-colors hover:border-ink has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:focus-visible]:shadow-[0_0_0_4px_rgb(19_122_61/0.25)]",
                error ? "border-danger-700" : "border-line-strong",
              )}
            >
              <input
                id={optionId}
                type="radio"
                value={o.value}
                className="size-6 shrink-0 accent-brand-600 focus-visible:outline-none"
                data-first={i === 0 ? "true" : undefined}
                {...inputProps(o.value)}
              />
              <span className="leading-snug">{o.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={id} message={error} />
    </fieldset>
  );
}

type CheckboxProps = { id: string; label: ReactNode; error?: string } & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ id, label, error, ...rest }, ref) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer gap-4 rounded-[var(--radius-control)] border-2 bg-white p-4 text-[1.0625rem] leading-relaxed text-body transition-colors has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 sm:p-5 sm:text-lg",
          error ? "border-danger-700" : "border-line-strong",
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-7 shrink-0 accent-brand-600"
          {...rest}
        />
        <span>{label}</span>
      </label>
      <FieldError id={id} message={error} />
    </div>
  );
});
