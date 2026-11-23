import { Floret, Rose } from './Florals.jsx';

/**
 * A shower of roses, small blossoms and petals falling down the whole
 * screen. Shown while the invitation opens. Purely decorative, and hidden
 * for guests who prefer reduced motion (see `.flower-rain` in the styles).
 */

// A repeatable "random" number between 0 and 1, so the rain looks the same
// on every visit and nothing jumps when the page re-renders.
const rand = (i, salt) => {
  const x = Math.sin(i * 127.100 + salt * 311.700) * 43758.545;
  return x - Math.floor(x);
};

const TONES = ['rose', 'lavender', 'white'];
const PETAL_COLOURS = ['#E8C6D0', '#D8C7F0', '#F0D5DD', '#CDBBEE', '#F6E3EA'];
const COUNT = 112;
// One rose, one blossom, then two loose petals, repeating.
const KINDS = ['rose', 'floret', 'petal', 'petal'];

const ITEMS = Array.from({ length: COUNT }, (_, i) => {
  const kind = KINDS[i % KINDS.length];
  const base = { rose: 34, floret: 20, petal: 14 }[kind];
  const range = { rose: 30, floret: 16, petal: 12 }[kind];
  return {
    kind,
    tone: TONES[Math.floor(rand(i, 5) * TONES.length)],
    colour: PETAL_COLOURS[Math.floor(rand(i, 6) * PETAL_COLOURS.length)],
    style: {
      '--x': `${(rand(i, 1) * 104 - 2).toFixed(1)}%`,
      '--size': `${Math.round(base + rand(i, 2) * range)}px`,
      // how long each flower takes to fall, and when it sets off
      '--dur': `${(5 + rand(i, 3) * 3.200).toFixed(2)}s`,
      '--delay': `${(rand(i, 4) * 4.600).toFixed(2)}s`,
      '--drift': `${Math.round((rand(i, 7) - 0.500) * 130)}px`,
      '--spin': `${Math.round((rand(i, 8) - 0.500) * 620)}deg`,
    },
  };
});

function Flower({ kind, tone, colour }) {
  if (kind === 'rose') {
    return (
      <svg viewBox="-40 -40 80 80" focusable="false">
        <Rose tone={tone} />
      </svg>
    );
  }
  if (kind === 'floret') {
    return (
      <svg viewBox="-12 -12 24 24" focusable="false">
        <Floret tone={tone} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" focusable="false">
      <path d="M10 1C16 6 17 14 10 19C3 14 4 6 10 1Z" fill={colour} />
    </svg>
  );
}

export default function FlowerRain() {
  return (
    <div className="flower-rain" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} className="flower-rain__item" style={item.style}>
          <Flower kind={item.kind} tone={item.tone} colour={item.colour} />
        </span>
      ))}
    </div>
  );
}
