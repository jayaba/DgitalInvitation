import { useState } from 'react';
import { Heart } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getCalendarMonth } from '../utils/date.js';
import { FlowerVeil } from './decor/Florals.jsx';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Mini calendar of the wedding month, with the wedding day set in a heart.
 * Once the date is confirmed the days are covered by white and rose flowers,
 * which fade away when a guest touches or hovers over them.
 */
export default function DateCalendar() {
  const { title, leadingBlanks, daysInMonth, weddingDay } = getCalendarMonth();
  const [isRevealed, setIsRevealed] = useState(false);
  const hasVeil = weddingDay !== null;
  const reveal = () => setIsRevealed(true);

  const label = weddingDay
    ? `Calendar for ${title}. The wedding is on the ${weddingDay}.`
    : `Calendar for ${title}. The exact date is to be announced.`;

  return (
    <div className="calendar">
      <p className="calendar__title">{title}</p>

      <div className="calendar__body">
        <div className="calendar__grid" role="img" aria-label={label}>
          {WEEKDAYS.map((day, i) => (
            <span key={`w${i}`} className="calendar__weekday" aria-hidden="true">{day}</span>
          ))}
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <span
              key={day}
              aria-hidden="true"
              className={`calendar__day ${day === weddingDay ? 'is-wedding' : ''}`}
            >
              {day === weddingDay && <Heart strokeWidth={1} />}
              <b>{day}</b>
            </span>
          ))}
        </div>

        {hasVeil && (
          <button
            type="button"
            className={`veil ${isRevealed ? 'is-revealed' : ''}`}
            onPointerEnter={reveal}
            onClick={reveal}
            onFocus={reveal}
            tabIndex={isRevealed ? -1 : 0}
            aria-hidden={isRevealed}
            aria-label="Reveal the wedding date"
          >
            <FlowerVeil />
            <span className="veil__hint">{wedding.date.revealHint}</span>
          </button>
        )}
      </div>
    </div>
  );
}
