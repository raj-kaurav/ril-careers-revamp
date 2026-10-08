"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";
import { hiringPlatform } from "@/data/site";
import { PoweredByHireSphere } from "./PoweredByHireSphere";

/**
 * The point where RIL Careers hands the candidate to HireSphere. With a
 * configured destination it navigates there; in the prototype (no URL) it
 * explains what would happen instead of pretending to submit anything.
 */
export function HireSphereHandoff({
  eyebrow,
  title,
  context,
  children,
  continueLabel,
  destination,
  back,
}: {
  eyebrow: string;
  title: ReactNode;
  /** e.g. "Reliance Retail · Mumbai" */
  context?: ReactNode;
  children: ReactNode;
  continueLabel: string;
  destination: string | null;
  back: { href: string; label: string };
}) {
  const [handedOff, setHandedOff] = useState(false);

  const onContinue = () => {
    if (destination) window.location.assign(destination);
    else setHandedOff(true);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-10 md:p-12">
      <span aria-hidden="true" className="block h-[3px] w-12 bg-accent" />
      <p className="eyebrow mt-8 text-accent-strong">{eyebrow}</p>
      <h1 className="mt-4 text-h2 text-primary">{title}</h1>
      {context ? <p className="mt-3 text-body-lg font-semibold text-text">{context}</p> : null}
      <div className="mt-6 max-w-xl text-body-lg text-text-muted">{children}</div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button size="lg" onClick={onContinue} icon={<ArrowRight className="size-5" />}>
          {continueLabel}
        </Button>
        <TextLink href={back.href}>{back.label}</TextLink>
      </div>

      <div role="status" className="empty:hidden">
        {handedOff ? (
          <div className="mt-8 flex gap-4 rounded-lg border border-accent-secondary/30 bg-accent-secondary/[0.06] p-5">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-secondary" />
            <p className="text-body text-text">
              This is where {hiringPlatform.name} takes over. The prototype isn&apos;t connected to{" "}
              {hiringPlatform.name}, so nothing has been submitted or stored.
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <PoweredByHireSphere />
      </div>
    </div>
  );
}
