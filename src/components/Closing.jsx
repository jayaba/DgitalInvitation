import { Heart } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';

/** The small footer line at the very end of the invitation. */
export default function Closing() {
  const { couple, venue } = wedding;

  return (
    <footer className="closing">
      <p className="closing__footer">
        <span>
          {couple.groom} <Heart size={12} fill="currentColor" aria-label="and" /> {couple.bride}
        </span>
        <span>{getDateLabel()} · {venue.name}</span>
      </p>
    </footer>
  );
}
