import { wedding } from '../config/wedding.js';

/**
 * Reads the guest's name from the link, so each invitation can be personal:
 *   https://your-site/?to=Nimal+Perera     →  "Dear Nimal Perera"
 * Returns '' when the link has no name.
 */
export function getGuestName() {
  const raw = new URLSearchParams(window.location.search).get('to') || '';
  return raw.replace(/\s+/g, ' ').trim().slice(0, 60);
}

/** e.g. "Dear Nimal Perera" — or '' when the link has no name. */
export function getGuestGreeting() {
  const name = getGuestName();
  return name ? `${wedding.guest.greeting} ${name}` : '';
}
