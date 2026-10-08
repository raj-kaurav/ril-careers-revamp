"use client";

import type { ReactNode } from "react";
import { Select } from "@/components/ui/Select";
import { businesses } from "@/data/businesses";
import { careerStages, jobFunctions } from "@/data/jobs";
import type { JobSearchCriteria } from "@/lib/job-search";
import { getJobLocations } from "@/lib/jobs-service";
import { cn } from "@/lib/utils";

type FilterKey = keyof JobSearchCriteria;

const jobLocations = getJobLocations();

function RadioGroup({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: { value: string; label: string; hint?: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="border-t border-border pt-6">
      <legend className="float-left mb-3 w-full text-label text-primary">{legend}</legend>
      <ul className="clear-left space-y-0.5">
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <li key={option.value}>
              <label
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 -mx-2 text-body transition-colors hover:bg-primary/5",
                  checked ? "font-semibold text-primary" : "text-text",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={checked}
                  onChange={() => onChange(option.value)}
                  className="size-[1.125rem] shrink-0 accent-primary"
                />
                <span className="flex flex-col leading-snug">
                  {option.label}
                  {option.hint ? <span className="text-body-sm font-normal text-text-muted">{option.hint}</span> : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function JobFilters({
  id,
  criteria,
  onChange,
  className,
  children,
}: {
  id?: string;
  criteria: JobSearchCriteria;
  onChange: (key: FilterKey, value: string) => void;
  className?: string;
  children?: ReactNode;
}) {
  const locationOptions = [
    { value: "", label: "Any location" },
    ...jobLocations.map((city) => ({ value: city, label: city })),
  ];
  if (criteria.location && !jobLocations.some((city) => city.toLowerCase() === criteria.location.toLowerCase())) {
    locationOptions.push({ value: criteria.location, label: criteria.location });
  }
  const locationValue =
    jobLocations.find((city) => city.toLowerCase() === criteria.location.toLowerCase()) ?? criteria.location;

  return (
    <div id={id} className={cn("space-y-6", className)}>
      <Select
        id="filter-location"
        label="Location"
        options={locationOptions}
        value={locationValue}
        onChange={(event) => onChange("location", event.target.value)}
      />
      <RadioGroup
        legend="Business"
        name="filter-business"
        value={criteria.business}
        onChange={(value) => onChange("business", value)}
        options={[{ value: "all", label: "All businesses" }, ...businesses.map((b) => ({ value: b.id, label: b.name }))]}
      />
      <RadioGroup
        legend="Experience"
        name="filter-career-stage"
        value={criteria.careerStage}
        onChange={(value) => onChange("careerStage", value)}
        options={[
          { value: "all", label: "All levels" },
          ...careerStages.map((stage) => ({ value: stage.value, label: stage.label, hint: stage.description })),
        ]}
      />
      <RadioGroup
        legend="Function"
        name="filter-function"
        value={criteria.jobFunction}
        onChange={(value) => onChange("jobFunction", value)}
        options={[{ value: "all", label: "All functions" }, ...jobFunctions]}
      />
      {children}
    </div>
  );
}
