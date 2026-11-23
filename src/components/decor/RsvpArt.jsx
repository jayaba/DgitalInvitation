import { Floret, Leaf } from './Florals.jsx';

const PLUM = '#5B3F8C';
const PLUM_SOFT = '#7C62A6';
const GOLD = '#D6B77A';
const ROSE = '#D98AA5';
const IVORY = '#FFFBF5';

/** A small open envelope with an "RSVP" card rising out of it and a heart seal. */
export function RsvpEnvelope({ className = '' }) {
  return (
    <svg className={`rsvp-envelope ${className}`} viewBox="0 0 128 100" aria-hidden="true" focusable="false"
      fill="none" strokeLinejoin="round" strokeLinecap="round">
      {/* back of the envelope and its raised flap */}
      <path d="M12 44 64 10l52 34v46H12z" fill="#E9DDF7" stroke={PLUM_SOFT} strokeWidth="1.600" />

      {/* the card */}
      <rect x="28" y="20" width="72" height="52" rx="3" fill={IVORY} stroke={GOLD} strokeWidth="1.400" />
      <rect x="33" y="25" width="62" height="42" rx="1.500" stroke={GOLD} strokeOpacity="0.500" strokeWidth="0.700" />
      <text x="65.500" y="45" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="15"
        fontWeight="600" letterSpacing="3" fill={PLUM}>
        RSVP
      </text>
      <path d="M50 53h28" stroke={GOLD} strokeWidth="0.900" />

      {/* front of the envelope */}
      <path d="M12 44 64 76l52-32v46H12z" fill="#F4ECFB" stroke={PLUM_SOFT} strokeWidth="1.600" />
      <path d="M12 90 50 67M116 90 78 67" stroke={PLUM_SOFT} strokeWidth="1.200" opacity="0.700" />

      {/* heart seal */}
      <circle cx="64" cy="77" r="10" fill={ROSE} stroke="#C4708E" strokeWidth="1" />
      <path d="M64 82.500c-4-3.200-6.200-5-6.200-7.400c0-1.700 1.300-2.900 2.900-2.900c1.300 0 2.500.800 3.300 2.100c.800-1.300 2-2.100 3.300-2.100c1.600 0 2.900 1.200 2.900 2.900c0 2.400-2.200 4.200-6.200 7.400z"
        fill={IVORY} />

      {/* a touch of flowers */}
      <Leaf x={108} y={90} r={-60} s={0.420} />
      <Leaf x={112} y={90} r={-110} s={0.380} deep />
      <Floret x={113} y={82} s={0.900} tone="rose" />
      <Floret x={15} y={86} s={0.800} />
    </svg>
  );
}
