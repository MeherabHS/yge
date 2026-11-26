import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function readingTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Human label for an event status ("past" reads as "Completed"). */
export function eventStatusLabel(status: string): string {
  if (status === "past") return "Completed";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/** Day range such as "8–11" from an event's start and end dates. */
export function eventDayRange(start?: string, end?: string): string {
  if (!start) return "";
  const first = new Date(start).getDate();
  return end ? `${first}–${new Date(end).getDate()}` : String(first);
}
