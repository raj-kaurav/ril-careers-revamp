import Image from "next/image";
import { getBusiness } from "@/data/businesses";
import type { EmployeeStory } from "@/data/stories";
import { cn } from "@/lib/utils";
import { StoryDialogButton } from "./StoryDialogButton";

function IllustrativeTag() {
  return (
    <span className="absolute bottom-3 left-3 rounded-sm bg-primary-dark/65 px-2 py-0.5 text-[0.75rem] leading-5 font-medium text-white/90 backdrop-blur-sm md:bottom-4 md:left-4">
      Illustrative story
    </span>
  );
}

export function StoryCard({ story, className }: { story: EmployeeStory; className?: string }) {
  const businessName = getBusiness(story.businessId)?.name ?? "";
  const dialogProps = { headline: story.headline, role: story.role, businessName, quote: story.quote };

  if (story.featured) {
    return (
      <article className={cn("group layout-grid items-end gap-y-8", className)}>
        <div className="relative col-span-4 aspect-[4/5] overflow-hidden rounded-lg bg-primary-dark sm:aspect-[4/3] md:col-span-8 md:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:h-[42rem]">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-[1.02]"
            style={{ objectPosition: story.image.focus }}
          />
          <IllustrativeTag />
        </div>

        <div className="col-span-4 md:col-span-7 lg:col-span-5 lg:pb-2 lg:pl-6 xl:pl-10">
          <p className="eyebrow text-accent-strong">{story.theme}</p>
          <h3 className="mt-5 text-statement text-primary">{story.headline}</h3>
          <blockquote className="mt-8 border-l-2 border-accent pl-6 text-[1.25rem] leading-[1.5] font-medium tracking-[-0.01em] text-primary md:text-[1.375rem]">
            “{story.quote}”
          </blockquote>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6">
            <p className="flex flex-col">
              <span className="text-body font-semibold text-text">{story.role}</span>
              <span className="text-body-sm text-text-muted">{businessName}</span>
            </p>
            <StoryDialogButton {...dialogProps} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group grid gap-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center md:grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-primary-dark sm:aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5]">
        <Image
          src={story.image.src}
          alt={story.image.alt}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 35vw, 100vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
          style={{ objectPosition: story.image.focus }}
        />
        <IllustrativeTag />
      </div>
      <div>
        <p className="eyebrow text-accent-strong">{story.theme}</p>
        <h3 className="mt-3 text-h3 text-primary">{story.headline}</h3>
        <p className="mt-3 flex flex-col">
          <span className="text-body font-semibold text-text">{story.role}</span>
          <span className="text-body-sm text-text-muted">{businessName}</span>
        </p>
        <div className="mt-3">
          <StoryDialogButton {...dialogProps} />
        </div>
      </div>
    </article>
  );
}
