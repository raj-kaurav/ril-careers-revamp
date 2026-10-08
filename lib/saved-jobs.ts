"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Device-local saved jobs for the prototype. In production, saved jobs belong
 * to the candidate's HireSphere account; this hook keeps the same interface so
 * the UI does not change when that is connected.
 */
const STORAGE_KEY = "ril-careers:saved-jobs";
const EMPTY: string[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function read(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }
  return cachedIds;
}

function write(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => event.key === STORAGE_KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSavedJobs() {
  const savedIds = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggleSaved = useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((saved) => saved !== id) : [...current, id]);
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, isSaved, toggleSaved };
}
