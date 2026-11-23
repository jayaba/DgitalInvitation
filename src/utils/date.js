import { wedding } from '../config/wedding.js';

const { iso, isConfirmed, isTimeConfirmed, monthLabel, timePendingLabel, timeZone, durationHours } =
  wedding.date;

export const weddingDate = new Date(iso);

const hasTime = isConfirmed && isTimeConfirmed;

// Year, month and day of the wedding as seen at the venue.
const local = Object.fromEntries(
  new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(weddingDate)
    .map((part) => [part.type, Number(part.value)]),
);

/** e.g. "Monday, 21 December 2026" — or "December 2026" until confirmed. */
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

/** e.g. "21 December 2026" (no weekday) — or "December 2026" until confirmed. */
export function getShortDateLabel() {
  if (!isConfirmed) return monthLabel;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(weddingDate);
}

/** e.g. "9:00 AM" — or "Time to be announced" until the time is confirmed. */
export function getTimeLabel() {
  if (!hasTime) return timePendingLabel;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(weddingDate);
}

/**
 * The wedding month laid out for a mini calendar.
 * `weddingDay` is null until the date is confirmed, so nothing is marked.
 */
export function getCalendarMonth() {
  const firstOfMonth = new Date(Date.UTC(local.year, local.month - 1, 1));
  return {
    title: new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(firstOfMonth),
    leadingBlanks: firstOfMonth.getUTCDay(), // weeks start on Sunday
    daysInMonth: new Date(Date.UTC(local.year, local.month, 0)).getUTCDate(),
    weddingDay: isConfirmed ? local.day : null,
  };
}

/**
 * "Save to calendar" links — null until the date is confirmed.
 * Saved as an all-day event until the time is confirmed too.
 */
export function getCalendarLinks() {
  if (!isConfirmed) return null;

  let start;
  let end;
  let icsStart;
  let icsEnd;
  if (hasTime) {
    const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    start = stamp(weddingDate);
    end = stamp(new Date(weddingDate.getTime() + durationHours * 3600000));
    icsStart = `DTSTART:${start}`;
    icsEnd = `DTEND:${end}`;
  } else {
    const day = (offset) =>
      new Date(Date.UTC(local.year, local.month - 1, local.day + offset))
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    start = day(0);
    end = day(1);
    icsStart = `DTSTART;VALUE=DATE:${start}`;
    icsEnd = `DTEND;VALUE=DATE:${end}`;
  }

  const title = `Wedding of ${wedding.couple.groom} & ${wedding.couple.bride}`;
  const place = `${wedding.venue.name}, ${wedding.venue.location}`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${start}-wedding-invitation`,
    `DTSTAMP:${weddingDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    icsStart,
    icsEnd,
    `SUMMARY:${title}`,
    `LOCATION:${place.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return {
    google:
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      `&text=${encodeURIComponent(title)}&dates=${start}/${end}` +
      `&location=${encodeURIComponent(place)}`,
    ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`,
  };
}
