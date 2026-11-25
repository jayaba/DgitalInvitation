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
 * When the event starts and ends, in the shapes the calendars want.
 * An all-day event until the time is confirmed too.
 */
function getEventTimes() {
  if (hasTime) {
    const endDate = new Date(weddingDate.getTime() + durationHours * 3600000);
    const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const plain = (date) => date.toISOString().replace(/\.\d{3}/, '');
    return {
      start: stamp(weddingDate),
      end: stamp(endDate),
      icsStart: `DTSTART:${stamp(weddingDate)}`,
      icsEnd: `DTEND:${stamp(endDate)}`,
      outlookStart: plain(weddingDate),
      outlookEnd: plain(endDate),
    };
  }
  const day = (offset) =>
    new Date(Date.UTC(local.year, local.month - 1, local.day + offset)).toISOString().slice(0, 10);
  const start = day(0).replace(/-/g, '');
  const end = day(1).replace(/-/g, '');
  return {
    start,
    end,
    icsStart: `DTSTART;VALUE=DATE:${start}`,
    icsEnd: `DTEND;VALUE=DATE:${end}`,
    outlookStart: day(0),
    outlookEnd: day(1),
  };
}

const eventTitle = `Wedding of ${wedding.couple.groom} & ${wedding.couple.bride}`;
const eventPlace = `${wedding.venue.name}, ${wedding.venue.location}`;

/**
 * The text of the calendar file (wedding.ics) — null until the date is
 * confirmed. The build writes it out as a real file, see vite.config.js.
 */
export function getCalendarFile() {
  if (!isConfirmed) return null;
  const { start, icsStart, icsEnd } = getEventTimes();
  const title = eventTitle;
  const place = eventPlace;

  return [
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
  ].join('\r\n') + '\r\n';
}

/**
 * "Save to calendar" links — null until the date is confirmed.
 * Google and Outlook open the guest's calendar with the event filled in;
 * Apple (and any other calendar app) gets the wedding.ics file.
 */
export function getCalendarLinks() {
  if (!isConfirmed) return null;
  const { start, end, outlookStart, outlookEnd } = getEventTimes();
  const title = encodeURIComponent(eventTitle);
  const place = encodeURIComponent(eventPlace);

  return {
    google:
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      `&text=${title}&dates=${start}/${end}&location=${place}`,
    outlook:
      'https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent' +
      `&subject=${title}&startdt=${encodeURIComponent(outlookStart)}&enddt=${encodeURIComponent(outlookEnd)}` +
      `${hasTime ? '' : '&allday=true'}&location=${place}`,
    ics: `${import.meta.env?.BASE_URL ?? './'}wedding.ics`,
  };
}
