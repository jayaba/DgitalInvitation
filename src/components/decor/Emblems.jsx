import { Lavender } from './Florals.jsx';

/**
 * Bespoke ornaments for the invitation card, drawn in SVG:
 * the couple's monogram emblem and a gold heart flourish.
 */

const GOLD = '#D6B77A';
const GOLD_DEEP = '#B8955A';
const PLUM = '#5B3F8C';
const IVORY = '#FFFBF5';
const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";

// The left-hand branch follows this curve; the right-hand one mirrors it.
const BRANCH = [[104, 147], [38, 140], [50, 44]];

function pointOnBranch(t) {
  const [a, b, c] = BRANCH;
  const u = 1 - t;
  return {
    x: u * u * a[0] + 2 * u * t * b[0] + t * t * c[0],
    y: u * u * a[1] + 2 * u * t * b[1] + t * t * c[1],
    // direction the branch is travelling in, in degrees
    angle:
      (Math.atan2(
        2 * u * (b[1] - a[1]) + 2 * t * (c[1] - b[1]),
        2 * u * (b[0] - a[0]) + 2 * t * (c[0] - b[0]),
      ) * 180) / Math.PI,
  };
}

const LEAVES = Array.from({ length: 11 }, (_, i) => 0.1 + i * 0.085);
const SPRIGS = [0.42, 0.66, 0.9];

function Branch({ mirrored = false }) {
  const [a, b, c] = BRANCH;
  return (
    <g transform={mirrored ? 'translate(240 0) scale(-1 1)' : undefined}>
      <path d={`M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}`} fill="none" stroke={GOLD_DEEP}
        strokeWidth="1.100" strokeLinecap="round" />
      {SPRIGS.map((t) => {
        const p = pointOnBranch(t);
        return <Lavender key={t} x={p.x} y={p.y} r={p.angle + 38} s={0.300} />;
      })}
      {LEAVES.map((t, i) => {
        const p = pointOnBranch(t);
        const side = i % 2 ? 1 : -1;
        return (
          <path key={t} d="M0 0C4-4.500 11-5 16 0C11 5 4 4.500 0 0Z"
            transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.angle + side * 44).toFixed(1)}) scale(${0.720 + (i % 3) * 0.100})`}
            fill={i % 3 === 1 ? '#E6D2A6' : GOLD} />
        );
      })}
    </g>
  );
}

/**
 * The couple's emblem: their two initials overlapping inside a small crest,
 * joined by a gold ampersand, with a branch of leaves and lavender on each
 * side and a lavender bow beneath.
 */
export function Monogram({ first, second, className = '' }) {
  const crest =
    'M120 20C132 33 151 29 161 44C171 58 177 70 173 87C169 105 163 116 151 126' +
    'C141 134 131 131 120 140C109 131 99 134 89 126C77 116 71 105 67 87' +
    'C63 70 69 58 79 44C89 29 108 33 120 20Z';

  return (
    <svg className={`monogram ${className}`} viewBox="0 0 240 182" role="img"
      aria-label={`${first} and ${second}`} focusable="false">
      <Branch />
      <Branch mirrored />

      <path d={crest} fill={IVORY} fillOpacity="0.850" stroke={GOLD} strokeWidth="1.600" />
      <path d={crest} fill="none" stroke={GOLD} strokeOpacity="0.700" strokeWidth="0.800"
        transform="translate(120 82) scale(0.900) translate(-120 -82)" />

      {/* the initials overlap; a pale outline lets each one read clearly */}
      <g fontFamily={SERIF} textAnchor="middle" paintOrder="stroke" stroke={IVORY}
        strokeLinejoin="round">
        <text x="101" y="96" fontSize="56" fontWeight="600" fill={PLUM} strokeWidth="3">{first}</text>
        <text x="141" y="115" fontSize="56" fontWeight="600" fill={PLUM} strokeWidth="3">{second}</text>
        <text x="121" y="112" fontSize="38" fontStyle="italic" fontWeight="500" fill={GOLD_DEEP}
          strokeWidth="2.500">&amp;</text>
      </g>

      {/* lavender bow */}
      <g stroke="#9A80C6" strokeWidth="0.700" strokeLinejoin="round">
        <path d="M119 152C114 160 109 166 104 172L112 169 115 176C118 167 120 160 121 152Z" fill="#C9B6EC" />
        <path d="M121 152C126 160 131 166 136 172L128 169 125 176C122 167 120 160 119 152Z" fill="#C9B6EC" />
        <path d="M120 150C108 138 93 140 95 150C93 161 108 160 120 150Z" fill="#D8C7F0" />
        <path d="M120 150C132 138 147 140 145 150C147 161 132 160 120 150Z" fill="#D8C7F0" />
        <ellipse cx="120" cy="150" rx="4.500" ry="5.200" fill="#B49BDF" />
      </g>
    </svg>
  );
}

/** A gold heart with a scroll and a tapering line to each side. */
export function HeartFlourish({ className = '' }) {
  const side = 'M104 14C98 21 89 21 87 15.500C86 11.500 91 9.500 93 12.500M87 15.500C68 17 40 9 6 15';
  return (
    <svg className={`heart-flourish ${className}`} viewBox="0 0 240 28" aria-hidden="true" focusable="false"
      fill="none" stroke={GOLD_DEEP} strokeWidth="1.100" strokeLinecap="round" strokeLinejoin="round">
      <path d={side} />
      <path d={side} transform="translate(240 0) scale(-1 1)" />
      <path d="M120 24C111 16.500 105 12 105 7C105 3.800 107.600 1.600 110.800 1.600C114.200 1.600 117.400 3.800 120 7.600C122.600 3.800 125.800 1.600 129.200 1.600C132.400 1.600 135 3.800 135 7C135 12 129 16.500 120 24Z" />
    </svg>
  );
}

/** A small symmetrical gold scroll, used above and below the date. */
export function Scroll({ className = '' }) {
  const half = 'M120 9C114 3 106 3 104 8C103 11.500 107 13 108.500 10.500M104 8C92 9 80 9 66 9';
  return (
    <svg className={`scroll ${className}`} viewBox="0 0 240 18" aria-hidden="true" focusable="false"
      fill="none" stroke={GOLD_DEEP} strokeWidth="1.100" strokeLinecap="round">
      <path d={half} />
      <path d={half} transform="translate(240 0) scale(-1 1)" />
      <path d="M120 5.500l3.500 3.500-3.500 3.500-3.500-3.500z" fill={GOLD} stroke="none" />
    </svg>
  );
}
