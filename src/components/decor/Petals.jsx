import { Floret, Rose } from './Florals.jsx';

/**
 * Flowers drifting slowly down the section they are placed in: loose
 * petals, small blossoms and the odd little rose. Purely decorative, and
 * hidden for guests who prefer reduced motion.
 *
 * `count` sets how many fall in that section (up to 24).
 */

// A repeatable "random" number between 0 and 1, so the drift looks the same
// on every visit and nothing jumps when the page re-renders.
const rand = (i, salt) => {
  const x = Math.sin(i * 91.300 + salt * 271.900) * 43758.545;
  return x - Math.floor(x);
};

// Mostly petals, with blossoms mixed in and a rose now and then.
const KINDS = ['petal', 'floret', 'petal', 'floret', 'petal', 'rose'];
const TONES = ['rose', 'lavender', 'white'];
const PETAL_COLOURS = ['#E8C6D0', '#D8C7F0', '#F0D5DD', '#CDBBEE'];
const MAX = 24;

const ITEMS = Array.from({ length: MAX }, (_, i) => {
  const kind = KINDS[i % KINDS.length];
  const base = { petal: 10, floret: 14, rose: 20 }[kind];
  const range = { petal: 6, floret: 8, rose: 10 }[kind];
  const dur = 16 + rand(i, 3) * 11;
  return {
    kind,
    tone: TONES[Math.floor(rand(i, 5) * TONES.length)],
    colour: PETAL_COLOURS[Math.floor(rand(i, 6) * PETAL_COLOURS.length)],
    size: Math.round(base + rand(i, 2) * range),
    style: {
      // spread evenly across the width, with a little wobble
      left: `${(((i * 37) % MAX) / MAX * 96 + 2 + (rand(i, 1) - 0.500) * 3).toFixed(1)}%`,
      '--dur': `${dur.toFixed(1)}s`,
      // a negative delay starts each one part-way down, so the section
      // already has flowers in it when it comes into view
      '--delay': `${(-rand(i, 4) * dur).toFixed(1)}s`,
      '--drift': `${Math.round(14 + rand(i, 7) * 20)}px`,
    },
  };
});

function Flower({ kind, tone, colour, size }) {
  if (kind === 'rose') {
    return (
      <svg viewBox="-40 -40 80 80" width={size} height={size} focusable="false">
        <Rose tone={tone} />
      </svg>
    );
  }
  if (kind === 'floret') {
    return (
      <svg viewBox="-12 -12 24 24" width={size} height={size} focusable="false">
        <Floret tone={tone} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} focusable="false">
      <path d="M10 1C16 6 17 14 10 19C3 14 4 6 10 1Z" fill={colour} />
    </svg>
  );
}

export default function Petals({ count = 18 }) {
  return (
    <div className="petals" aria-hidden="true">
      {ITEMS.slice(0, count).map((item, i) => (
        <span key={i} className="petal" style={item.style}>
          <Flower kind={item.kind} tone={item.tone} colour={item.colour} size={item.size} />
        </span>
      ))}
    </div>
  );
}
