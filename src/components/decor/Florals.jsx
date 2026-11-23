/**
 * Hand-drawn style floral artwork, built from inline SVG so the site
 * needs no image files. Everything here is decorative (aria-hidden).
 */

const TONES = {
  rose: { outer: '#F4E0E6', mid: '#E8C6D0', inner: '#DDB0BE', core: '#CF9AAB', line: '#BC8598' },
  lavender: { outer: '#EFE6F8', mid: '#D8C7F0', inner: '#C6B0E8', core: '#B199DA', line: '#9A80C6' },
  white: { outer: '#FFFFFF', mid: '#FCF8F3', inner: '#F6EEE3', core: '#EAD9B6', line: '#BFAE94' },
};
const SAGE = '#B5C2AC';
const SAGE_DEEP = '#9DAE94';
const GOLD = '#D6B77A';
const PETALS = [0, 72, 144, 216, 288];

export function Rose({ x = 0, y = 0, s = 1, r = 0, tone = 'rose' }) {
  const c = TONES[tone];
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {PETALS.map((a) => (
        <ellipse key={`o${a}`} cx="0" cy="-17" rx="17" ry="19" transform={`rotate(${a})`}
          fill={c.outer} stroke={c.line} strokeOpacity="0.28" strokeWidth="0.6" />
      ))}
      {PETALS.map((a) => (
        <ellipse key={`m${a}`} cx="0" cy="-10.500" rx="12" ry="13.500" transform={`rotate(${a + 36})`}
          fill={c.mid} stroke={c.line} strokeOpacity="0.3" strokeWidth="0.6" />
      ))}
      {PETALS.map((a) => (
        <ellipse key={`i${a}`} cx="0" cy="-5" rx="7" ry="8" transform={`rotate(${a + 12})`}
          fill={c.inner} stroke={c.line} strokeOpacity="0.3" strokeWidth="0.5" />
      ))}
      <circle r="4.500" fill={c.core} />
      <path d="M-2 0a2 2 0 1 1 4 0a3.500 3.500 0 1 1-7 0" fill="none" stroke={c.line}
        strokeWidth="0.8" strokeLinecap="round" />
    </g>
  );
}

export function Leaf({ x = 0, y = 0, r = 0, s = 1, deep = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C9-11 27-12 40 0C27 12 9 11 0 0Z" fill={deep ? SAGE_DEEP : SAGE} opacity="0.85" />
      <path d="M2 0H36" stroke="#FFFDF9" strokeOpacity="0.7" strokeWidth="0.7" strokeLinecap="round" />
    </g>
  );
}

export function Lavender({ x = 0, y = 0, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C2-30-2-62 0-96" fill="none" stroke={SAGE_DEEP} strokeWidth="1.300" strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const k = 1 - i * 0.05;
        const cx = side * 3.600 * k;
        const cy = -34 - i * 7;
        return (
          <ellipse key={i} cx={cx} cy={cy} rx={3 * k} ry={5.200 * k}
            transform={`rotate(${side * 28} ${cx} ${cy})`}
            fill={i % 3 === 0 ? '#CDBBEE' : '#B8A0E2'} />
        );
      })}
      <ellipse cx="0" cy="-99" rx="2.200" ry="4.400" fill="#B8A0E2" />
    </g>
  );
}

function GoldSprig({ x = 0, y = 0, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="none" stroke={GOLD}
      strokeWidth="1" strokeLinecap="round">
      <path d="M0 0C1-22-1-44 0-66" />
      {[-14, -28, -42, -54].map((cy, i) => (
        <g key={cy}>
          <path d={`M0 ${cy}C-6 ${cy - 3}-10 ${cy - 8}-${11 - i} ${cy - 13}`} />
          <path d={`M0 ${cy - 4}C6 ${cy - 7} 10 ${cy - 12} ${11 - i} ${cy - 17}`} />
        </g>
      ))}
      <circle cx="0" cy="-69" r="1.600" fill={GOLD} stroke="none" />
    </g>
  );
}

export function Floret({ x = 0, y = 0, s = 1, tone = 'lavender' }) {
  const c = TONES[tone];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {PETALS.map((a) => (
        <ellipse key={a} cx="0" cy="-5" rx="3.400" ry="5" transform={`rotate(${a})`}
          fill={c.mid} stroke={c.line} strokeOpacity="0.3" strokeWidth="0.4" />
      ))}
      <circle r="2" fill={GOLD} />
    </g>
  );
}

// White and rose blooms laid out in overlapping rows, enough to hide what is beneath.
const VEIL_FLOWERS = Array.from({ length: 20 }, (_, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  return {
    x: 30 + col * 60 + ((i * 17) % 11) - 5,
    y: 36 + row * 63 + ((i * 29) % 9) - 4,
    s: 1.120 + ((i * 7) % 3) * 0.100,
    r: (i * 53) % 360,
    tone: (row + col) % 2 ? 'white' : 'rose',
    motion: veilMotion(i),
  };
});

/**
 * How one bloom moves: a gentle sway while it waits, then a slow, wandering
 * drift away once the guest touches the flowers. Values are SVG units/seconds.
 */
function veilMotion(i) {
  const side = i % 2 ? 1 : -1;
  return {
    '--dx': `${(((i * 37) % 7) - 3) * 42}px`,
    '--dy': `${i % 4 === 0 ? -(50 + ((i * 13) % 4) * 22) : 70 + ((i * 13) % 5) * 34}px`,
    '--wx': `${side * (16 + (i % 3) * 10)}px`,
    '--rot': `${side * (50 + ((i * 11) % 70))}deg`,
    '--dur': `${5.500 + (i % 4) * 0.800}s`,
    '--delay': `${((i * 7) % 20) * 0.090}s`,
    '--sway': `${3 + (i % 3) * 0.800}s`,
    '--sway-delay': `${-((i * 5) % 7) * 0.400}s`,
  };
}
const VEIL_LEAVES = [
  [-6, 60, 200], [-4, 170, 170], [306, 90, -20], [304, 200, 15],
  [110, 268, 80], [240, 266, 110],
];

/**
 * A blanket of white and rose flowers. Each bloom is its own group so the
 * flowers can fade away one after another (see `.veil` in the stylesheet).
 */
export function FlowerVeil() {
  return (
    <svg className="veil__art" viewBox="0 0 300 262" aria-hidden="true" focusable="false">
      <rect className="veil__wash" x="-4" y="-4" width="308" height="270" rx="16" fill="#FFFDF9" />
      {VEIL_LEAVES.map(([x, y, r], i) => (
        <g key={`${x}-${y}`} className="veil__flower" style={veilMotion(i + 3)}>
          <Leaf x={x} y={y} r={r} s={0.900} deep={r > 0} />
        </g>
      ))}
      {VEIL_FLOWERS.map((f) => (
        <g key={`${f.x}-${f.y}`} className="veil__flower" style={f.motion}>
          <Rose x={f.x} y={f.y} s={f.s} r={f.r} tone={f.tone} />
        </g>
      ))}
    </svg>
  );
}

const WREATH_R = 168;
const onRing = (deg, r = WREATH_R) => {
  const t = (deg * Math.PI) / 180;
  return { x: +(r * Math.sin(t)).toFixed(1), y: +(-r * Math.cos(t)).toFixed(1) };
};
// Angles (clockwise from the top) of the leaves on the right-hand branch;
// the left-hand branch is its mirror image.
const WREATH_LEAVES = Array.from({ length: 18 }, (_, i) => 20 + i * 8.600);

/**
 * A wreath of leaves on a fine gold ring, framing the couple's names.
 * Two branches rise from the bottom and nearly meet at the top.
 */
export function Wreath({ className = '' }) {
  const start = onRing(12);
  const end = onRing(348);
  return (
    <svg className={`wreath ${className}`} viewBox="-215 -215 430 430" aria-hidden="true" focusable="false">
      <path d={`M${start.x} ${start.y}A${WREATH_R} ${WREATH_R} 0 1 1 ${end.x} ${end.y}`}
        fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.75" />

      {WREATH_LEAVES.map((deg, i) => {
        const p = onRing(deg);
        const tilt = i % 2 ? 40 : -34;
        const s = 0.560 + (i % 3) * 0.070;
        return (
          <g key={deg}>
            <Leaf x={p.x} y={p.y} r={deg + 180 + tilt} s={s} deep={i % 2 === 0} />
            <Leaf x={-p.x} y={p.y} r={-deg - tilt} s={s} deep={i % 2 === 1} />
          </g>
        );
      })}

      <circle cx={start.x} cy={start.y} r="2" fill={GOLD} />
      <circle cx={end.x} cy={end.y} r="2" fill={GOLD} />
      <path d={`M0 ${WREATH_R - 7}l7 7-7 7-7-7z`} fill="#FFFDF9" stroke={GOLD} strokeWidth="1" />
      <path d={`M0 ${WREATH_R - 3}l3 3-3 3-3-3z`} fill={GOLD} />
    </svg>
  );
}

/**
 * A cluster of roses and lavender for the corner of a section.
 * Drawn for the top-left corner; pass position="tr" | "bl" | "br" to mirror it.
 */
export function FloralCorner({ position = 'tl', className = '' }) {
  return (
    <svg className={`floral floral--${position} ${className}`} viewBox="0 0 236 236"
      aria-hidden="true" focusable="false">
      <Lavender x={104} y={58} r={72} s={1.250} />
      <Lavender x={110} y={84} r={98} s={1} />
      <Lavender x={58} y={104} r={162} s={1.250} />
      <Lavender x={84} y={110} r={188} s={1} />
      <Lavender x={104} y={104} r={135} s={1.150} />
      <GoldSprig x={120} y={34} r={58} s={1.300} />
      <GoldSprig x={34} y={120} r={212} s={1.300} />

      <Leaf x={112} y={98} r={28} s={1.200} />
      <Leaf x={98} y={112} r={62} s={1.200} deep />
      <Leaf x={150} y={52} r={-8} s={1.050} deep />
      <Leaf x={52} y={150} r={98} s={1.050} />
      <Leaf x={36} y={44} r={205} s={0.900} />
      <Leaf x={150} y={84} r={30} s={0.850} />
      <Leaf x={84} y={150} r={60} s={0.850} deep />

      <Lavender x={130} y={44} r={52} s={0.950} />
      <Lavender x={44} y={130} r={218} s={0.950} />
      <Leaf x={176} y={40} r={-22} s={0.800} />
      <Leaf x={40} y={176} r={112} s={0.800} deep />
      <Leaf x={126} y={120} r={45} s={1} />

      <Rose x={118} y={112} s={0.780} r={30} tone="lavender" />
      <Floret x={162} y={66} s={1.300} tone="rose" />
      <Floret x={66} y={162} s={1.300} />
      <Floret x={146} y={98} s={1.100} />
      <Floret x={98} y={146} s={1.100} tone="rose" />
      <Floret x={196} y={46} />
      <Floret x={46} y={196} tone="rose" />

      <Rose x={128} y={50} s={1.100} r={20} tone="lavender" />
      <Rose x={50} y={128} s={1.100} r={-15} />
      <Rose x={74} y={74} s={1.700} />
      <Rose x={170} y={36} s={0.550} r={40} />
      <Rose x={36} y={170} s={0.550} tone="lavender" />

      {[[188, 70], [70, 188], [150, 120], [120, 150], [214, 30], [30, 214]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.800" fill={GOLD} />
      ))}
    </svg>
  );
}

/** Ornamental gold divider with a small diamond at its centre. */
export function Divider({ className = '' }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 220 24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="divider-fade-l" x1="0" x2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0" />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
        <linearGradient id="divider-fade-r" x1="0" x2="1">
          <stop offset="0" stopColor={GOLD} />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="11.500" width="84" height="1" fill="url(#divider-fade-l)" />
      <rect x="136" y="11.500" width="84" height="1" fill="url(#divider-fade-r)" />
      <circle cx="92" cy="12" r="1.500" fill={GOLD} />
      <circle cx="128" cy="12" r="1.500" fill={GOLD} />
      <path d="M110 3.500l8.500 8.500-8.500 8.500-8.500-8.500z" fill="none" stroke={GOLD} strokeWidth="1" />
      <path d="M110 8.500l3.500 3.500-3.500 3.500-3.500-3.500z" fill={GOLD} />
    </svg>
  );
}

/** Small five-petal blossom, used as a timeline marker and accent. */
export function Blossom({ className = '', tone = 'lavender' }) {
  const c = TONES[tone];
  return (
    <svg className={`blossom ${className}`} viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
      {PETALS.map((a) => (
        <ellipse key={a} cx="0" cy="-7.500" rx="5" ry="7" transform={`rotate(${a})`}
          fill={c.mid} stroke={c.line} strokeOpacity="0.35" strokeWidth="0.5" />
      ))}
      <circle r="3" fill={GOLD} />
    </svg>
  );
}

/** Two lavender stems crossed beneath a rose — a small centred emblem. */
export function Posy({ className = '' }) {
  return (
    <svg className={`posy ${className}`} viewBox="0 0 160 110" aria-hidden="true" focusable="false">
      <Lavender x={80} y={96} r={-52} s={0.800} />
      <Lavender x={80} y={96} r={52} s={0.800} />
      <Lavender x={80} y={96} r={-28} s={0.900} />
      <Lavender x={80} y={96} r={28} s={0.900} />
      <Leaf x={80} y={84} r={-160} s={0.800} />
      <Leaf x={80} y={84} r={-20} s={0.800} deep />
      <Rose x={80} y={72} s={0.950} />
    </svg>
  );
}
