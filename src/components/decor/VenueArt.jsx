/**
 * Small playful illustrations for the venue card, drawn in SVG:
 * a car following a dotted path to a heart pin, an alarm clock with a
 * heart at its centre, and two linked gold hearts.
 */

const PLUM = '#5B3F8C';
const GOLD = '#D6B77A';
const GOLD_DEEP = '#B8955A';
const ROSE = '#D98AA5';
const IVORY = '#FFFBF5';

// A heart about 16 units wide, centred on 0,0.
const HEART =
  'M0 6C-5 1.500-8-1-8-4C-8-6.200-6.300-7.700-4.200-7.700C-2.500-7.700-1-6.700 0-5' +
  'C1-6.700 2.500-7.700 4.200-7.700C6.300-7.700 8-6.200 8-4C8-1 5 1.500 0 6Z';

function Heart({ x, y, s = 1, ...rest }) {
  return <path d={HEART} transform={`translate(${x} ${y}) scale(${s})`} {...rest} />;
}

/** A car travelling along a dotted, looping path to a heart-shaped pin. */
export function TravelPath({ className = '' }) {
  return (
    <svg className={`travel-path ${className}`} viewBox="0 -10 280 84" aria-hidden="true" focusable="false"
      fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* little rays around the pin */}
      <path d="M40 8l-6-6M33 22h-9M52 1l-2-8" stroke={GOLD_DEEP} strokeWidth="1.600" />

      {/* the pin, with a heart inside */}
      <path d="M64 60C52 46 46 38 46 28A18 18 0 1 1 82 28C82 38 76 46 64 60Z" fill={IVORY} stroke={PLUM}
        strokeWidth="2.200" />
      <Heart x={64} y={28} s={0.950} fill={PLUM} />

      {/* the dotted path, with a loop along the way */}
      <path d="M86 52C106 68 132 64 144 48C152 36 140 26 133 36C126 47 144 58 166 55C186 52 198 47 206 43"
        stroke={PLUM} strokeWidth="2" strokeDasharray="0.100 6.500" />

      {/* the car */}
      <path d="M208 44h40v-6.500c0-2-1.200-3.300-3.200-3.700l-5.300-1-4-5.800c-.900-1.200-2.200-1.800-3.700-1.800h-9.600c-1.500 0-2.800.600-3.700 1.800l-4 5.800-3.600.900c-1.800.500-2.900 1.800-2.900 3.700z"
        fill={PLUM} stroke={PLUM} strokeWidth="1" />
      <path d="M219 32.500l2.500-3.600h9l2.500 3.600z" fill={IVORY} />
      <circle cx="217" cy="44.500" r="4" fill={IVORY} stroke={PLUM} strokeWidth="2" />
      <circle cx="239" cy="44.500" r="4" fill={IVORY} stroke={PLUM} strokeWidth="2" />

      {/* two small hearts drifting from the car */}
      <Heart x={258} y={30} s={0.500} fill={ROSE} />
      <Heart x={268} y={21} s={0.380} fill={ROSE} />
    </svg>
  );
}

/** An alarm clock whose face holds a heart. */
export function HeartClock({ className = '' }) {
  return (
    <svg className={`heart-clock ${className}`} viewBox="0 0 64 60" aria-hidden="true" focusable="false"
      fill="none" stroke={PLUM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6l5 6M2 16l7 2" stroke={GOLD_DEEP} strokeWidth="1.600" />
      <path d="M24 13a7 7 0 1 1 10-9M52 13a7 7 0 1 0-10-9" />
      <circle cx="38" cy="32" r="17" fill={IVORY} />
      <path d="M38 22v10l6 4" strokeWidth="1.600" />
      <path d="M27 47l-4 7M49 47l4 7" />
      <Heart x={38} y={39} s={0.420} fill={ROSE} stroke="none" />
    </svg>
  );
}

/** Two linked gold hearts between a pair of fine lines. */
export function LinkedHearts({ className = '' }) {
  return (
    <svg className={`linked-hearts ${className}`} viewBox="0 0 200 24" aria-hidden="true" focusable="false"
      fill="none" stroke={GOLD_DEEP} strokeWidth="1.200" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13h66M126 13h66" stroke={GOLD} />
      <Heart x={93} y={12} s={1.050} />
      <Heart x={107} y={12} s={1.050} />
    </svg>
  );
}
