import { Floret, Leaf, Rose } from './Florals.jsx';

/**
 * Illustrations for the wedding-day schedule, drawn in SVG so they stay
 * sharp and light: a welcome sign, the Poruwa, and the reception.
 */

const PLUM = '#5B3F8C';
const PLUM_SOFT = '#7C62A6';
const GOLD = '#D6B77A';
const GOLD_DEEP = '#B8955A';
const ROSE = '#D98AA5';
const PINK = '#E8A9BF';
const LILAC = '#CDBBEE';
const IVORY = '#FFFBF5';
const WOOD = '#B98A5E';
const FLAME = '#F2A63B';
const GLOW = '#FBE7A6';

const HEART =
  'M0 6C-5 1.500-8-1-8-4C-8-6.200-6.300-7.700-4.200-7.700C-2.500-7.700-1-6.700 0-5' +
  'C1-6.700 2.500-7.700 4.200-7.700C6.300-7.700 8-6.200 8-4C8-1 5 1.500 0 6Z';

const svgProps = { 'aria-hidden': true, focusable: 'false', fill: 'none' };

/** A flower-trimmed welcome sign on an easel, with a glowing lantern. */
export function WelcomeArt() {
  return (
    <svg viewBox="0 0 230 182" {...svgProps}>
      <ellipse cx="118" cy="170" rx="104" ry="9" fill="#EADDF6" opacity="0.750" />

      {/* easel */}
      <path d="M118 50V152" stroke="#CDA47A" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 52 66 168M152 52l18 116" stroke={WOOD} strokeWidth="5" strokeLinecap="round" />
      <rect x="60" y="120" width="116" height="7" rx="2" fill={WOOD} />

      {/* sign */}
      <rect x="66" y="36" width="104" height="84" rx="4" fill={IVORY} stroke={GOLD} strokeWidth="2.200" />
      <rect x="72" y="42" width="92" height="72" rx="2" stroke={GOLD} strokeOpacity="0.550" strokeWidth="0.800" />
      <text x="118" y="85" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="29" fill={PLUM}>
        Welcome
      </text>
      <path d={HEART} transform="translate(118 101) scale(0.550)" fill={ROSE} />

      {/* flowers over the top corner */}
      <Leaf x={148} y={42} r={-165} s={0.700} />
      <Leaf x={164} y={46} r={62} s={0.700} deep />
      <Leaf x={170} y={34} r={-25} s={0.600} />
      <Rose x={160} y={36} s={0.620} />
      <Rose x={138} y={30} s={0.460} tone="lavender" />
      <Rose x={175} y={57} s={0.400} tone="lavender" />
      <Floret x={121} y={33} s={0.900} tone="rose" />
      <Floret x={177} y={76} s={0.800} />

      {/* lantern */}
      <circle cx="36" cy="140" r="30" fill={GLOW} opacity="0.500" />
      <path d="M28 113a8 8 0 0 1 16 0" stroke={PLUM} strokeWidth="2" />
      <path d="M23 123l5-9h16l5 9z" fill={PLUM_SOFT} />
      <rect x="24" y="123" width="24" height="35" rx="2" fill="#FBE29A" stroke={PLUM} strokeWidth="2" />
      <path d="M32 123v35M40 123v35" stroke={PLUM} strokeWidth="1.200" opacity="0.550" />
      <path d="M36 151c-4.500-4-4.500-8.500 0-13.500c4.500 5 4.500 9.500 0 13.500z" fill={FLAME} />
      <rect x="21" y="158" width="30" height="6" rx="2" fill={PLUM_SOFT} />

      {/* a little greenery at the foot */}
      <Leaf x={188} y={168} r={-72} s={0.600} />
      <Leaf x={192} y={168} r={-112} s={0.500} deep />
      <Floret x={198} y={151} s={0.800} tone="rose" />
      <Leaf x={58} y={168} r={-100} s={0.500} />
    </svg>
  );
}

function OilLamp({ x }) {
  return (
    <g>
      <circle cx={x} cy="108" r="11" fill={GLOW} opacity="0.550" />
      <path d={`M${x} 115c-4-4-3.500-8.500 0-12.500c3.500 4 4 8.500 0 12.500z`} fill={FLAME} />
      <path d={`M${x - 10} 118q10 8 20 0z`} fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.800" />
      <rect x={x - 1.500} y="122" width="3" height="52" fill={GOLD} />
      <ellipse cx={x} cy="136" rx="5" ry="2" fill={GOLD_DEEP} />
      <ellipse cx={x} cy="152" rx="5.500" ry="2.200" fill={GOLD_DEEP} />
      <path d={`M${x - 10} 182h20l-3.500-8h-13z`} fill={GOLD_DEEP} />
    </g>
  );
}

// Loose petals scattered on the floor in front of the Poruwa: [x, y, angle, colour].
const FLOOR_PETALS = [
  [52, 186, 20, PINK], [70, 192, -30, ROSE], [112, 190, 40, PINK], [128, 195, -10, LILAC],
  [150, 189, 25, ROSE], [172, 194, -35, PINK], [196, 188, 15, LILAC], [214, 193, -20, ROSE],
  [100, 184, -45, LILAC], [184, 184, 50, PINK],
];

/**
 * The Poruwa: a gold-pillared canopy hung with white drapes and garlands
 * of roses, two seats, an oil lamp on each side, and a basket of petals.
 */
export function PoruwaArt() {
  const scallops = Array.from({ length: 11 }, () => 'q8 8 16 0').join('');
  return (
    <svg viewBox="0 0 270 204" {...svgProps}>
      <ellipse cx="135" cy="190" rx="128" ry="10" fill="#EADDF6" opacity="0.750" />

      {/* platform */}
      <rect x="30" y="168" width="210" height="12" rx="3" fill="#EBD9B8" stroke={GOLD_DEEP} strokeWidth="0.800" />
      <rect x="44" y="156" width="182" height="12" rx="3" fill="#F4E6CB" stroke={GOLD_DEEP} strokeWidth="0.800" />

      {/* back pillars and drapes */}
      <rect x="96" y="66" width="8" height="90" fill="#E6CF98" />
      <rect x="166" y="66" width="8" height="90" fill="#E6CF98" />
      <path d="M62 62C84 96 112 96 135 70C158 96 186 96 208 62V56H62Z" fill="#FFF7EE" stroke="#E8D7C0" strokeWidth="0.800" />
      <path d="M62 62C54 96 56 130 64 156H75C68 130 68 96 72 64Z" fill="#FFF7EE" stroke="#E8D7C0" strokeWidth="0.800" />
      <path d="M208 62C216 96 214 130 206 156H195C202 130 202 96 198 64Z" fill="#FFF7EE" stroke="#E8D7C0" strokeWidth="0.800" />

      {/* seats */}
      {[106, 140].map((x) => (
        <g key={x}>
          <rect x={x + 2} y="136" width="20" height="16" stroke={GOLD_DEEP} strokeWidth="1.600" />
          <path d={`M${x + 2} 144h20`} stroke={GOLD_DEEP} strokeWidth="1" />
          <rect x={x} y="128" width="24" height="9" rx="4.500" fill={PINK} stroke={ROSE} strokeWidth="0.800" />
        </g>
      ))}

      {/* front pillars */}
      {[52, 206].map((x) => (
        <g key={x}>
          <rect x={x} y="60" width="12" height="96" rx="2" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.800" />
          <rect x={x - 4} y="150" width="20" height="7" rx="2" fill={GOLD_DEEP} />
          <rect x={x - 4} y="60" width="20" height="6" rx="2" fill={GOLD_DEEP} />
        </g>
      ))}

      {/* canopy */}
      <path d="M52 48C80 30 106 30 135 18C164 30 190 30 218 48Z" fill="#EBD29A" stroke={GOLD_DEEP} strokeWidth="0.800" />
      <circle cx="135" cy="13" r="4" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.800" />
      <path d="M135 1l3 7h-6z" fill={GOLD_DEEP} />
      <rect x="42" y="46" width="186" height="14" rx="3" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1" />
      <path d={`M47 60${scallops}`} stroke={GOLD_DEEP} strokeWidth="1" />

      {/* hanging strings of flowers */}
      {[82, 118, 152, 188].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 62v${i % 2 ? 34 : 26}`} stroke="#D9A9BD" strokeWidth="0.800" />
          <Floret x={x} y={74} s={0.550} tone={i % 2 ? 'lavender' : 'rose'} />
          <Floret x={x} y={86} s={0.550} tone={i % 2 ? 'rose' : 'lavender'} />
          {i % 2 === 1 && <Floret x={x} y={97} s={0.500} tone="white" />}
        </g>
      ))}

      {/* garland along the canopy */}
      <Leaf x={78} y={50} r={-170} s={0.550} />
      <Leaf x={118} y={44} r={-160} s={0.600} deep />
      <Leaf x={152} y={44} r={-20} s={0.600} />
      <Leaf x={192} y={50} r={-10} s={0.550} deep />
      <Rose x={68} y={50} s={0.480} />
      <Floret x={86} y={46} s={0.900} tone="white" />
      <Rose x={103} y={44} s={0.500} tone="lavender" />
      <Rose x={135} y={38} s={0.700} />
      <Rose x={167} y={44} s={0.500} tone="lavender" />
      <Floret x={184} y={46} s={0.900} tone="white" />
      <Rose x={202} y={50} s={0.480} />

      {/* flowers at the foot of the pillars */}
      <Leaf x={66} y={154} r={-30} s={0.500} />
      <Rose x={58} y={152} s={0.500} tone="lavender" />
      <Rose x={72} y={158} s={0.380} />
      <Leaf x={204} y={154} r={-150} s={0.500} deep />
      <Rose x={212} y={152} s={0.500} />
      <Rose x={198} y={158} s={0.380} tone="lavender" />

      <OilLamp x={22} />
      <OilLamp x={248} />

      {FLOOR_PETALS.map(([x, y, angle, colour]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4" ry="2.200" fill={colour}
          transform={`rotate(${angle} ${x} ${y})`} />
      ))}

      {/* basket of petals */}
      <path d="M72 180C72 160 98 160 98 180" stroke="#A9794A" strokeWidth="2" />
      <path d="M70 180h30l-4 15c-.600 2-2 3-4 3H78c-2 0-3.400-1-4-3z" fill="#C99A62" stroke="#A9794A" strokeWidth="1" />
      <path d="M73 186h24M75 192h20M79 181v16M85 181v17M91 181v16" stroke="#A9794A" strokeWidth="0.700" opacity="0.700" />
      <ellipse cx="85" cy="179" rx="14" ry="5" fill={PINK} />
      <ellipse cx="80" cy="177" rx="4" ry="2.200" fill={ROSE} />
      <ellipse cx="89" cy="176" rx="4" ry="2.200" fill={LILAC} />
      <ellipse cx="85" cy="181" rx="4" ry="2" fill="#F4D5DF" />
    </svg>
  );
}

function Flute({ x, tilt }) {
  return (
    <g transform={`rotate(${tilt} ${x} 166)`}>
      <path d={`M${x - 7} 100h14l-2 30c-.400 5.500-9.600 5.500-10 0z`} fill="#F8E3A8" stroke={GOLD_DEEP} strokeWidth="1.400" />
      <path d={`M${x} 134v28`} stroke={GOLD_DEEP} strokeWidth="1.600" />
      <ellipse cx={x} cy="164" rx="8" ry="2.500" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.800" />
      <circle cx={x - 2} cy="118" r="1.200" fill={IVORY} />
      <circle cx={x + 2} cy="110" r="1" fill={IVORY} />
      <circle cx={x} cy="124" r="0.900" fill={IVORY} />
    </g>
  );
}

const DISCO_RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/** The reception: a tiered cake, two glasses, a disco ball, a speaker and music. */
export function ReceptionArt() {
  return (
    <svg viewBox="0 0 250 190" {...svgProps}>
      <ellipse cx="125" cy="180" rx="118" ry="9" fill="#EADDF6" opacity="0.750" />

      {/* disco ball */}
      <path d="M192 0v16" stroke={GOLD_DEEP} strokeWidth="1.200" />
      {DISCO_RAYS.map((deg) => (
        <path key={deg} d="M0-27v-7" stroke={GOLD_DEEP} strokeWidth="1.400" strokeLinecap="round"
          transform={`translate(192 38) rotate(${deg + 22})`} />
      ))}
      <circle cx="192" cy="38" r="22" fill={LILAC} stroke={PLUM} strokeWidth="1.400" />
      <g stroke={PLUM} strokeWidth="0.700" opacity="0.700">
        <ellipse cx="192" cy="38" rx="22" ry="8" />
        <ellipse cx="192" cy="38" rx="22" ry="16" />
        <ellipse cx="192" cy="38" rx="8" ry="22" />
        <ellipse cx="192" cy="38" rx="16" ry="22" />
        <path d="M170 38h44M192 16v44" />
      </g>
      <path d="M180 26h6v5h-6zM196 44h6v5h-6zM186 48h5v5h-5z" fill="#FFFFFF" opacity="0.700" />

      {/* music notes */}
      <g fill={PLUM} stroke={PLUM} strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round">
        <path d="M118 46V28l16-4v18" fill="none" />
        <ellipse cx="114" cy="46" rx="4.500" ry="3.500" stroke="none" />
        <ellipse cx="130" cy="42" rx="4.500" ry="3.500" stroke="none" />
        <path d="M152 30V14l8 3" fill="none" />
        <ellipse cx="148" cy="30" rx="4.200" ry="3.300" stroke="none" />
      </g>

      {/* glasses */}
      <Flute x={38} tilt={8} />
      <Flute x={62} tilt={-8} />

      {/* cake on its stand */}
      <ellipse cx="118" cy="174" rx="22" ry="4" fill={GOLD} />
      <rect x="112" y="162" width="12" height="12" fill={GOLD_DEEP} />
      <ellipse cx="118" cy="162" rx="50" ry="5" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.800" />
      <rect x="78" y="126" width="80" height="35" rx="5" fill="#FFF8F0" stroke="#E6D2A6" strokeWidth="1" />
      <rect x="78" y="151" width="80" height="5" fill="#E8C6D0" />
      <rect x="90" y="98" width="56" height="28" rx="5" fill="#FFF8F0" stroke="#E6D2A6" strokeWidth="1" />
      <rect x="90" y="118" width="56" height="4" fill="#D8C7F0" />
      <rect x="102" y="76" width="32" height="22" rx="4" fill="#FFF8F0" stroke="#E6D2A6" strokeWidth="1" />
      <rect x="102" y="91" width="32" height="3.500" fill="#E8C6D0" />
      <Leaf x={112} y={74} r={-170} s={0.500} />
      <Leaf x={124} y={74} r={-10} s={0.500} deep />
      <Rose x={118} y={70} s={0.550} />
      <Floret x={98} y={100} s={0.900} />
      <Rose x={150} y={127} s={0.420} tone="lavender" />
      <Floret x={84} y={130} s={0.900} tone="rose" />

      {/* speaker */}
      <rect x="186" y="104" width="48" height="66" rx="6" fill={PLUM} />
      <circle cx="210" cy="146" r="15" fill={PLUM_SOFT} stroke={LILAC} strokeWidth="2" />
      <circle cx="210" cy="146" r="6" fill="#3F2B66" />
      <circle cx="210" cy="117" r="6.500" fill={PLUM_SOFT} stroke={LILAC} strokeWidth="1.500" />

      {/* flowers at the foot */}
      <Leaf x={164} y={174} r={-150} s={0.550} />
      <Rose x={172} y={170} s={0.500} />
      <Rose x={186} y={175} s={0.380} tone="lavender" />
      <Leaf x={80} y={176} r={-30} s={0.500} deep />
      <Rose x={72} y={174} s={0.420} tone="lavender" />
    </svg>
  );
}

/** A lavender bow between two fine gold lines, closing the section. */
export function BowDivider({ className = '' }) {
  return (
    <svg className={`bow-divider ${className}`} viewBox="0 0 300 48" {...svgProps}>
      <path d="M10 22h96M194 22h96" stroke={GOLD} strokeWidth="1.200" strokeLinecap="round" />
      <path d="M112 22c-6-6-14-4-12 1c1.500 3 6 2 5-1M188 22c6-6 14-4 12 1c-1.500 3-6 2-5-1" stroke={GOLD_DEEP}
        strokeWidth="1.100" strokeLinecap="round" />
      <g transform="translate(30 -128)" stroke="#9A80C6" strokeWidth="0.700" strokeLinejoin="round">
        <path d="M119 152C114 160 109 166 104 172L112 169 115 176C118 167 120 160 121 152Z" fill="#C9B6EC" />
        <path d="M121 152C126 160 131 166 136 172L128 169 125 176C122 167 120 160 119 152Z" fill="#C9B6EC" />
        <path d="M120 150C108 138 93 140 95 150C93 161 108 160 120 150Z" fill="#D8C7F0" />
        <path d="M120 150C132 138 147 140 145 150C147 161 132 160 120 150Z" fill="#D8C7F0" />
        <ellipse cx="120" cy="150" rx="4.500" ry="5.200" fill="#B49BDF" />
      </g>
    </svg>
  );
}
