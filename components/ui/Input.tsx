import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: ReactNode;
  wrapperClassName?: string;
};

export const fieldShell =
  "flex h-14 w-full items-center gap-3 rounded-md border border-primary/50 bg-surface px-4 text-text md:h-16 md:px-5 " +
  "transition-[border-color,box-shadow] duration-200 hover:border-primary/80 " +
  "focus-within:border-primary focus-within:ring-[3px] focus-within:ring-accent-secondary/35";

export function Input({ id, label, icon, className, wrapperClassName, ...props }: InputProps) {
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <label htmlFor={id} className="text-label text-primary">
        {label}
      </label>
      <div className={fieldShell}>
        {icon ? (
          <span aria-hidden="true" className="text-text-muted">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          className={cn(
            "h-full w-full min-w-0 bg-transparent text-body text-text placeholder:text-text-muted focus:outline-none focus-visible:outline-none md:text-body-lg",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
