import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldShell } from "./Input";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  icon?: ReactNode;
  options: { value: string; label: string }[];
  wrapperClassName?: string;
};

export function Select({ id, label, icon, options, className, wrapperClassName, ...props }: SelectProps) {
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <label htmlFor={id} className="text-label text-primary">
        {label}
      </label>
      <div className={cn(fieldShell, "relative pr-0")}>
        {icon ? (
          <span aria-hidden="true" className="text-text-muted">
            {icon}
          </span>
        ) : null}
        <select
          id={id}
          className={cn(
            "h-full w-full min-w-0 cursor-pointer appearance-none bg-transparent pr-11 text-body text-text focus:outline-none focus-visible:outline-none md:text-body-lg",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 size-5 text-text-muted" />
      </div>
    </div>
  );
}
