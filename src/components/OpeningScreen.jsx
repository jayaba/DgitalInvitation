import { wedding } from '../config/wedding.js';
import { getGuestGreeting } from '../utils/guest.js';
import CoupleNames from './CoupleNames.jsx';
import { Divider } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';

/** Envelope whose flap lifts and lets a small heart out when the button is pressed. */
function EnvelopeIcon() {
  return (
    <svg className="envelope" viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="1.400" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path className="envelope__heart" fill="currentColor" stroke="none"
        d="M12 13.200c-2.200-1.500-3.300-2.600-3.300-3.900 0-1 .8-1.700 1.700-1.700.6 0 1.200.3 1.600.9.400-.6 1-.9 1.600-.9.900 0 1.700.7 1.700 1.700 0 1.300-1.100 2.400-3.300 3.900z" />
      <rect x="3" y="8" width="18" height="12" rx="1.500" />
      <path className="envelope__flap" d="M3.500 8.500 12 14.500l8.500-6" />
    </svg>
  );
}

/**
 * The closed invitation shown first. `phase` drives a staged opening:
 *   idle     – waiting for the guest
 *   pressed  – the button glows and its envelope opens
 *   leaving  – the welcome card fades and the flowers ease outward
 *   opening  – the cover parts down the middle like a card being opened
 */
export default function OpeningScreen({ phase, onOpen }) {
  const { eyebrow, note, button } = wedding.opening;
  const guestGreeting = getGuestGreeting();
  const isBusy = phase !== 'idle';

  return (
    <div className={`opening is-${phase}`}>
      <div className="opening__door opening__door--left" />
      <div className="opening__door opening__door--right" />
      <span className="opening__seam" />

      <PaintedCorner position="tl" />
      <PaintedCorner position="br" />

      <div className="opening__card">
        <p className="eyebrow opening__item">{eyebrow}</p>
        <CoupleNames as="h1" className="names--stacked opening__item" />
        <Divider className="opening__item" />
        <p className="opening__note opening__item">{note}</p>
        {guestGreeting && <p className="opening__guest opening__item">{guestGreeting}</p>}
        <button
          type="button"
          className="btn btn--invite opening__item"
          onClick={onOpen}
          disabled={isBusy}
        >
          <EnvelopeIcon />
          {button}
        </button>
      </div>
    </div>
  );
}
