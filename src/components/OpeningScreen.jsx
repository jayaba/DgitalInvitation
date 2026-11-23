import { ChevronRight } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getGuestGreeting } from '../utils/guest.js';
import CoupleNames from './CoupleNames.jsx';
import { HeartFlourish, Monogram } from './decor/Emblems.jsx';
import { GardenPath, HangingLantern, LeafSprig } from './decor/OpeningArt.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';

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
 * The first thing a guest sees: a tall gold arch in a lavender garden, with
 * the couple's emblem, their names, a personal greeting and the button that
 * opens the invitation. `phase` drives the staged opening:
 *   idle     – waiting for the guest
 *   pressed  – the button glows and its envelope opens
 *   leaving  – the arch fades, the flowers and lanterns ease away
 *   opening  – the whole cover fades away behind a rain of flowers
 *              (the rain itself is drawn by FlowerRain, in App)
 */
export default function OpeningScreen({ phase, onOpen }) {
  const { eyebrow, note, button } = wedding.opening;
  const { groom, bride } = wedding.couple;
  const guestGreeting = getGuestGreeting();
  const isBusy = phase !== 'idle';

  return (
    <div className={`opening is-${phase}`}>
      <div className="opening__door opening__door--left" />
      <div className="opening__door opening__door--right" />
      <span className="opening__seam" />

      <Petals count={18} />
      <PaintedCorner position="tl" />
      <PaintedCorner position="br" />

      <HangingLantern className="opening__lantern opening__lantern--left" />
      <HangingLantern className="opening__lantern opening__lantern--right" />
      <HangingLantern className="opening__lantern opening__lantern--far" />

      <div className="opening__card">
        <GardenPath className="opening__path" />

        <Monogram className="opening__item" first={groom[0]} second={bride[0]} />
        <p className="opening__eyebrow opening__item"><span>{eyebrow}</span></p>
        <CoupleNames as="h1" className="names--stacked opening__item" />
        <HeartFlourish className="opening__item" />
        <p className="opening__note opening__item">{note}</p>

        {/* shown only when the link carries a guest's name (?to=Name) */}
        {guestGreeting && (
          <p className="opening__guest opening__item">
            <LeafSprig />
            <span>{guestGreeting}</span>
            <LeafSprig flipped />
          </p>
        )}

        <button
          type="button"
          className="btn btn--invite opening__item"
          onClick={onOpen}
          disabled={isBusy}
        >
          <EnvelopeIcon />
          {button}
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
