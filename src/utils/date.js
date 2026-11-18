import { wedding } from '../config/wedding.js';

const { iso, isConfirmed, monthLabel, timePendingLabel, timeZone } = wedding.date;

export const weddingDate = new Date(iso);

/** e.g. "Saturday, 12 December 2026" — or "December 2026" until confirmed. */
export function getDateLabel() {
  if (!isConfirmed) return monthLabel;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(weddingDate);
}

/** e.g. "9:00 AM" — or "Time to be announced" until confirmed. */
export function getTimeLabel() {
  if (!isConfirmed) return timePendingLabel;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(weddingDate);
}
