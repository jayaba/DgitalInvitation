/**
 * A few petals drifting slowly down the section they are placed in.
 * Purely decorative; hidden for guests who prefer reduced motion.
 */
const PETALS = [
  { left: 8, size: 15, dur: 17, delay: -2, drift: 26, color: '#E8C6D0' },
  { left: 22, size: 11, dur: 22, delay: -11, drift: 18, color: '#D8C7F0' },
  { left: 37, size: 13, dur: 19, delay: -6, drift: 30, color: '#F0D5DD' },
  { left: 52, size: 10, dur: 24, delay: -17, drift: 16, color: '#E8C6D0' },
  { left: 64, size: 14, dur: 18, delay: -9, drift: 28, color: '#CDBBEE' },
  { left: 76, size: 11, dur: 21, delay: -14, drift: 20, color: '#F0D5DD' },
  { left: 88, size: 13, dur: 20, delay: -4, drift: 24, color: '#E8C6D0' },
  { left: 95, size: 10, dur: 25, delay: -20, drift: 14, color: '#D8C7F0' },
];

export default function Petals({ count = PETALS.length }) {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.slice(0, count).map((p) => (
        <span
          key={p.left}
          className="petal"
          style={{
            left: `${p.left}%`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        >
          <svg viewBox="0 0 20 20" width={p.size} height={p.size} focusable="false">
            <path d="M10 1C16 6 17 14 10 19C3 14 4 6 10 1Z" fill={p.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}
