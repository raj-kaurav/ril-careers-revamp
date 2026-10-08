import { hiringPlatform } from "@/data/site";
import { cn } from "@/lib/utils";

/** Quiet attribution for HireSphere-backed surfaces (search, results, apply, My Careers). */
export function PoweredByHireSphere({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-body-sm text-text-muted", className)}>
      <span aria-hidden="true" className="relative inline-flex size-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-accent-secondary/60" />
        <span className="size-1.5 rounded-full bg-accent-secondary" />
      </span>
      Powered by <span className="font-semibold text-primary">{hiringPlatform.name}</span>
    </p>
  );
}
