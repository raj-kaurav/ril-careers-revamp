"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  applyCriteriaToParams,
  criteriaFromParams,
  emptyCriteria,
  hasCriteria,
  type JobSearchCriteria,
} from "@/lib/job-search";
import { scrollToId } from "@/lib/utils";

type JobSearchContextValue = {
  /** Values currently in the search form. */
  draft: JobSearchCriteria;
  updateDraft: (patch: Partial<JobSearchCriteria>) => void;
  /** Last submitted search — what a real results request would be made with. */
  submitted: JobSearchCriteria | null;
  submitSearch: (criteria: JobSearchCriteria) => void;
  clearSearch: () => void;
};

const JobSearchContext = createContext<JobSearchContextValue | null>(null);

export const SEARCH_STATUS_ID = "search-status";
export const RESULTS_ID = "opportunity-results";

export function JobSearchProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<JobSearchCriteria>(emptyCriteria);
  const [submitted, setSubmitted] = useState<JobSearchCriteria | null>(null);

  // Hydrate from shareable URLs (?q=&location=&business=) after mount so the
  // hero stays statically prerendered.
  useEffect(() => {
    const fromUrl = criteriaFromParams(new URLSearchParams(window.location.search));
    if (hasCriteria(fromUrl)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
      setDraft(fromUrl);
      setSubmitted(fromUrl);
    }
  }, []);

  const updateDraft = useCallback((patch: Partial<JobSearchCriteria>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const submitSearch = useCallback((criteria: JobSearchCriteria) => {
    setDraft(criteria);
    setSubmitted(criteria);
    const params = applyCriteriaToParams(new URLSearchParams(window.location.search), criteria);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}#opportunities`);
    requestAnimationFrame(() => scrollToId(RESULTS_ID, { focusId: SEARCH_STATUS_ID }));
  }, []);

  const clearSearch = useCallback(() => {
    setDraft(emptyCriteria);
    setSubmitted(null);
    const params = applyCriteriaToParams(new URLSearchParams(window.location.search), emptyCriteria);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, []);

  const value = useMemo(
    () => ({ draft, updateDraft, submitted, submitSearch, clearSearch }),
    [draft, updateDraft, submitted, submitSearch, clearSearch],
  );

  return <JobSearchContext.Provider value={value}>{children}</JobSearchContext.Provider>;
}

export function useJobSearch() {
  const context = useContext(JobSearchContext);
  if (!context) throw new Error("useJobSearch must be used within JobSearchProvider");
  return context;
}
