import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getCalendarMonth } from '../utils/date.js';
import { FlowerVeil, VEIL_ITEMS, VEIL_ROSE_COUNT } from './decor/Florals.jsx';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// How close (in the veil's own units, where it is 300 wide) a finger must
// come to a flower's centre to brush it away.
const REACH = 36;
// Once this share of the roses has been brushed away, the rest drift off by
// themselves, so nobody has to hunt for the last one.
const ENOUGH = 0.650;

/**
 * Mini calendar of the wedding month, with the wedding day set in a heart.
 * Once the date is confirmed the days are covered by white and rose flowers
 * that the guest brushes away by hand: each flower slides off in the
 * direction it is pushed as a finger (or the mouse) passes over it.
 */
export default function DateCalendar() {
  const { title, leadingBlanks, daysInMonth, weddingDay } = getCalendarMonth();
  const [swept, setSwept] = useState({});
  const [isRevealed, setIsRevealed] = useState(false);
  const svgRef = useRef(null);
  const hasVeil = weddingDay !== null;

  const sweptRoses = Object.keys(swept).filter((id) => id.startsWith('rose')).length;
  const cleared = sweptRoses / VEIL_ROSE_COUNT;
  const hasStarted = Object.keys(swept).length > 0;

  useEffect(() => {
    if (!isRevealed && cleared >= ENOUGH) setIsRevealed(true);
  }, [cleared, isRevealed]);

  /** Brush away every flower within reach of this point on the screen. */
  const sweepAt = (clientX, clientY) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!matrix || isRevealed) return;
    const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse());

    setSwept((previous) => {
      let next = previous;
      for (const item of VEIL_ITEMS) {
        if (previous[item.id]) continue;
        const dx = item.cx - point.x;
        const dy = item.cy - point.y;
        const distance = Math.hypot(dx, dy);
        if (distance > REACH) continue;

        // push it directly away from the finger, a little further each time
        const ux = distance ? dx / distance : 0;
        const uy = distance ? dy / distance : -1;
        const push = 105 + ((item.cx * 7 + item.cy * 3) % 55);
        if (next === previous) next = { ...previous };
        next[item.id] = {
          '--sx': `${Math.round(ux * push)}px`,
          '--sy': `${Math.round(uy * push + 26)}px`,
          '--srot': `${Math.round((ux >= 0 ? 1 : -1) * (70 + ((item.cx + item.cy) % 90)))}deg`,
        };
      }
      return next;
    });
  };

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
            className={`veil ${hasStarted ? 'has-started' : ''} ${isRevealed ? 'is-revealed' : ''}`}
            // finger or mouse: brush the flowers it passes over
            onPointerDown={(event) => sweepAt(event.clientX, event.clientY)}
            onPointerMove={(event) => sweepAt(event.clientX, event.clientY)}
            // keeps working while the page is scrolling under the finger
            onTouchMove={(event) => {
              for (const touch of event.touches) sweepAt(touch.clientX, touch.clientY);
            }}
            // keyboard: Enter or Space clears them all
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsRevealed(true);
              }
            }}
            tabIndex={isRevealed ? -1 : 0}
            aria-hidden={isRevealed}
            aria-label="Reveal the wedding date: brush the flowers away, or press Enter"
          >
            <FlowerVeil
              svgRef={svgRef}
              swept={swept}
              // the ivory backing thins out as the flowers are brushed away
              washOpacity={isRevealed ? 0 : Math.max(0, 1 - cleared * 2.200)}
            />
            <span className="veil__hint">{wedding.date.revealHint}</span>
          </button>
        )}
      </div>
    </div>
  );
}
