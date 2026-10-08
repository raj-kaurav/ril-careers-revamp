import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { Business } from "@/data/businesses";
import { cn } from "@/lib/utils";

const sizeClasses: Record<Business["size"], string> = {
  featured: "col-span-2 aspect-[4/5] sm:aspect-[16/11] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  medium: "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[4/3] lg:col-span-5 lg:aspect-auto",
  compact: "col-span-1 lg:col-span-3 lg:mt-8",
};

const imageSizes: Record<Business["size"], string> = {
  featured: "(min-width: 1024px) 700px, 100vw",
  medium: "(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw",
  compact: "(min-width: 1024px) 300px, 50vw",
};

type BusinessCardProps = {
  business: Business;
  selected: boolean;
  onSelect: () => void;
  panelId: string;
};

function SelectButton({ business, selected, onSelect, panelId, describedBy }: BusinessCardProps & { describedBy: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-controls={panelId}
      aria-describedby={describedBy}
      className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
    >
      {business.name}
    </button>
  );
}

export function BusinessCard(props: BusinessCardProps) {
  const { business, selected } = props;
  const categoryId = `business-${business.id}-category`;
  const focusRing =
    "has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-accent";

  if (business.size === "compact") {
    return (
      <li className={cn("group relative rounded-md", focusRing, sizeClasses.compact)}>
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-md bg-primary transition-shadow duration-300",
            selected && "ring-2 ring-accent ring-offset-4 ring-offset-background-dark",
          )}
        >
          <Image
            src={business.image.src}
            alt=""
            fill
            sizes={imageSizes.compact}
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            style={{ objectPosition: business.image.focus }}
          />
        </div>
        <h3 className="mt-4 flex items-start gap-2 text-[1.125rem] leading-snug font-bold tracking-[-0.015em] text-white sm:text-h3">
          <SelectButton {...props} describedBy={categoryId} />
          {selected ? <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" /> : null}
        </h3>
        <p id={categoryId} className="mt-1 text-body-sm text-text-inverse-muted">
          {business.category}
        </p>
      </li>
    );
  }

  const isFeatured = business.size === "featured";

  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-lg bg-primary",
        focusRing,
        sizeClasses[business.size],
      )}
    >
      <Image
        src={business.image.src}
        alt=""
        fill
        sizes={imageSizes[business.size]}
        className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-[1.03]"
        style={{ objectPosition: business.image.focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/25 to-transparent"
      />

      {selected ? (
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-sm bg-accent px-2.5 py-1 text-body-sm font-semibold text-primary-dark md:top-6 md:left-6">
          <Check className="size-4" aria-hidden="true" />
          Selected
        </span>
      ) : null}

      <span
        aria-hidden="true"
        className="absolute top-5 right-5 inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:top-6 md:right-6"
      >
        <ArrowUpRight className="size-5" />
      </span>

      <div className={cn("absolute inset-x-0 bottom-0", isFeatured ? "p-6 md:p-10" : "p-6 md:p-8")}>
        <p id={categoryId} className={cn("eyebrow", selected ? "text-accent" : "text-white/80")}>
          {business.category}
        </p>
        <h3
          className={cn(
            "mt-3 font-bold text-white",
            isFeatured
              ? "text-[2.75rem] leading-none tracking-[-0.04em] md:text-[4rem]"
              : "text-[1.75rem] leading-tight tracking-[-0.03em] md:text-[2rem]",
          )}
        >
          <SelectButton {...props} describedBy={categoryId} />
        </h3>
        {isFeatured ? (
          <p className="mt-4 max-w-md text-[1.25rem] leading-snug font-medium text-white/90 md:text-[1.5rem]">
            {business.tagline}
          </p>
        ) : null}
      </div>

      {selected ? <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-accent" /> : null}
    </li>
  );
}
