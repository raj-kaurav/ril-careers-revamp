import { ArrowRight, Bookmark, BookmarkCheck, BriefcaseBusiness, MapPin } from "lucide-react";
import { getBusiness } from "@/data/businesses";
import type { DemoJob } from "@/data/jobs";
import { cn } from "@/lib/utils";

export function JobCard({
  job,
  saved,
  onToggleSave,
  onView,
}: {
  job: DemoJob;
  saved: boolean;
  onToggleSave: () => void;
  onView: () => void;
}) {
  const business = getBusiness(job.businessId);
  const titleId = `${job.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-[box-shadow,border-color] duration-300 ease-premium hover:border-primary/30 hover:shadow-card md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-label text-primary">{business?.name}</p>
          <span className="rounded-sm border border-dashed border-text-muted/50 px-2 py-0.5 text-body-sm font-medium text-text-muted">
            Demo opportunity
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
          className={cn(
            "-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-md transition-colors",
            saved ? "text-accent-strong hover:bg-accent/10" : "text-text-muted hover:bg-primary/5 hover:text-primary",
          )}
        >
          {saved ? (
            <BookmarkCheck className="size-6 fill-accent/25" aria-hidden="true" />
          ) : (
            <Bookmark className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <h3 id={titleId} className="mt-4 text-h3 text-primary">
        {job.title}
      </h3>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-body text-text-muted">
        <li className="inline-flex items-center gap-2">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Location: </span>
          {job.location}
        </li>
        <li className="inline-flex items-center gap-2">
          <BriefcaseBusiness className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Experience: </span>
          {job.experience}
        </li>
      </ul>

      <ul aria-label="Key skills" className="mt-5 mb-6 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <li key={skill} className="rounded-sm bg-background-muted px-2.5 py-1 text-body-sm font-medium text-text">
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
        <span className="text-body-sm text-text-muted">{job.employmentType}</span>
        <button
          type="button"
          onClick={onView}
          aria-label={`View role: ${job.title}`}
          className="group/view inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-label font-semibold text-primary underline-offset-[6px] decoration-accent hover:underline"
        >
          View role
          <ArrowRight className="size-4 transition-transform group-hover/view:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
