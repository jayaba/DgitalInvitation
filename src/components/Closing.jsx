import { Heart, Share2 } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import Reveal from './Reveal.jsx';
import { Divider } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';

/** WhatsApp link that shares the invitation (without any guest's name in it). */
function shareLink(text) {
  const url = `${window.location.origin}${window.location.pathname}`;
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
}

export default function Closing() {
  const { closing, couple, venue } = wedding;

  return (
    <footer className="closing">
      <div className="closing__body">
        <PaintedCorner position="bl" />
        <PaintedCorner position="br" />
        <Petals count={6} />

        <div className="container container--narrow">
          <Reveal>
            <p className="closing__signoff">{closing.signOff}</p>
            <CoupleNames />
            <Divider />
            <p className="closing__message">{closing.message}</p>
            <a className="btn btn--outline closing__share" href={shareLink(closing.shareText)}
              target="_blank" rel="noopener noreferrer">
              <Share2 size={16} aria-hidden="true" />
              {closing.shareLabel}
            </a>
          </Reveal>
        </div>
      </div>

      <p className="closing__footer">
        <span>
          {couple.groom} <Heart size={12} fill="currentColor" aria-label="and" /> {couple.bride}
        </span>
        <span>{getDateLabel()} · {venue.name}</span>
      </p>
    </footer>
  );
}
