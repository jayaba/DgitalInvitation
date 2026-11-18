import { Heart } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import Reveal from './Reveal.jsx';
import { Divider, FloralCorner } from './decor/Florals.jsx';
import Petals from './decor/Petals.jsx';

export default function Closing() {
  const { closing, couple, venue } = wedding;

  return (
    <footer className="closing">
      <div className="closing__body">
        <FloralCorner position="bl" />
        <FloralCorner position="br" />
        <Petals count={6} />

        <div className="container container--narrow">
          <Reveal>
            <p className="closing__signoff">{closing.signOff}</p>
            <CoupleNames />
            <Divider />
            <p className="closing__message">{closing.message}</p>
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
