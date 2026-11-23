/**
 * Artwork for the opening screen, drawn in SVG: hanging lanterns, a garden
 * path leading up to a small castle, and a little sprig of gold leaves.
 */

const GOLD = '#D6B77A';
const GOLD_DEEP = '#B8955A';

/**
 * A lantern on a fine chain. The chain's length is set in the stylesheet
 * with `--chain`, so each lantern can hang at its own height.
 */
export function HangingLantern({ className = '' }) {
  return (
    <div className={`lantern ${className}`} aria-hidden="true">
      <span className="lantern__chain" />
      <svg viewBox="0 0 44 70" focusable="false" fill="none">
        <defs>
          <radialGradient id="lantern-glow" cx="50%" cy="62%" r="60%">
            <stop offset="0" stopColor="#FFF6CF" />
            <stop offset="1" stopColor="#F5C96A" />
          </radialGradient>
          <radialGradient id="lantern-halo">
            <stop offset="0" stopColor="#FFE08A" stopOpacity="0.750" />
            <stop offset="0.450" stopColor="#FFD877" stopOpacity="0.300" />
            <stop offset="1" stopColor="#FFD877" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* the light: a wide soft halo and a brighter core, both flickering */}
        <circle className="lantern__halo" cx="22" cy="40" r="46" fill="url(#lantern-halo)" />
        <circle className="lantern__core" cx="22" cy="40" r="24" fill="#FFE9A8" opacity="0.550" />
        <circle cx="22" cy="5" r="3.500" stroke={GOLD_DEEP} strokeWidth="1.400" />
        <path d="M12 20 22 9l10 11z" fill={GOLD_DEEP} />
        <rect x="10" y="20" width="24" height="4" rx="1" fill={GOLD} />
        <path d="M11 24h22l2.500 32h-27z" fill="url(#lantern-glow)" stroke={GOLD_DEEP} strokeWidth="1.400"
          strokeLinejoin="round" />
        <path d="M22 24v32M16.500 24 15 56M27.500 24 29 56" stroke={GOLD_DEEP} strokeWidth="0.900" />
        <path d="M22 50c-4-3.500-4-7.500 0-12c4 4.500 4 8.500 0 12z" fill="#F2A63B" />
        <rect x="7.500" y="56" width="29" height="4" rx="1" fill={GOLD} />
        <path d="M18 60h8l-4 8z" fill={GOLD_DEEP} />
      </svg>
    </div>
  );
}

/** Soft lavender hills, a few trees, a small castle and a path winding up to it. */
export function GardenPath({ className = '' }) {
  return (
    <svg className={`garden-path ${className}`} viewBox="0 0 400 150" aria-hidden="true" focusable="false"
      fill="none">
      {/* far hill */}
      <path d="M0 112C80 74 150 66 200 70C262 62 330 78 400 106V150H0Z" fill="#E4D7F4" />

      {/* trees */}
      {[[132, 62, 1], [146, 66, 0.800], [254, 62, 1], [268, 67, 0.800]].map(([x, y, k]) => (
        <g key={x}>
          <path d={`M${x} ${y + 12 * k}v${8 * k}`} stroke="#B49BDF" strokeWidth="1.600" />
          <ellipse cx={x} cy={y} rx={5 * k} ry={13 * k} fill="#C2ADE8" />
        </g>
      ))}

      {/* castle */}
      <g fill="#C9B6EC">
        <rect x="170" y="50" width="60" height="22" />
        <rect x="190" y="36" width="20" height="36" />
        <rect x="163" y="43" width="11" height="29" />
        <rect x="226" y="43" width="11" height="29" />
      </g>
      <g fill="#B49BDF">
        <path d="M187 36 200 22l13 14z" />
        <path d="M161 43l7.500-10 7.500 10zM224 43l7.500-10 7.500 10z" />
      </g>
      <path d="M200 22V12" stroke="#B49BDF" strokeWidth="1" />
      <path d="M200 12l8 3-8 3z" fill="#E8A9BF" />
      <path d="M196 72v-8a4 4 0 0 1 8 0v8z" fill="#FFFBF5" />
      <path d="M176 56h4v6h-4zM220 56h4v6h-4zM198 42h4v6h-4z" fill="#FFFBF5" opacity="0.850" />

      {/* near hill */}
      <path d="M0 132C100 98 300 98 400 132V150H0Z" fill="#EEE5FA" />

      {/* the path */}
      <path d="M196 72C182 86 230 96 213 110C196 124 148 130 146 150H266C264 132 240 122 232 110C224 98 220 86 204 72Z"
        fill="#FFFBF5" stroke={GOLD} strokeWidth="0.900" />
      <path d="M201 82c6 4 8 8 6 12M213 104c-10 8-28 14-36 26M226 116c8 8 12 18 13 28M196 130c-6 6-9 12-10 18"
        stroke={GOLD} strokeWidth="0.700" strokeLinecap="round" opacity="0.700" />
    </svg>
  );
}

/** A tiny sprig of three gold leaves, set either side of the guest's name. */
export function LeafSprig({ flipped = false }) {
  return (
    <svg className="leaf-sprig" viewBox="0 0 30 22" aria-hidden="true" focusable="false"
      style={flipped ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M28 13C20 15 10 14 3 9" fill="none" stroke={GOLD_DEEP} strokeWidth="1" strokeLinecap="round" />
      <g fill={GOLD}>
        <path d="M22 13.500C19 8 13 7 10 9C13 13 18 15 22 13.500Z" />
        <path d="M17 14.500C15 19 10 20.500 6.500 19C8.500 15 13 13.500 17 14.500Z" />
        <path d="M10 11C7.500 6.500 3.500 5 1 6.500C3 10 6.500 12 10 11Z" />
      </g>
    </svg>
  );
}
