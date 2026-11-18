import { wedding } from '../config/wedding.js';

/** "Eranga & Piyumi" in script lettering. `as` sets the heading level. */
export default function CoupleNames({ as: Tag = 'h2', className = '' }) {
  const { groom, bride } = wedding.couple;
  return (
    <Tag className={`names ${className}`} aria-label={`${groom} and ${bride}`}>
      <span className="names__name">{groom}</span>
      <span className="names__amp" aria-hidden="true">&amp;</span>
      <span className="names__name">{bride}</span>
    </Tag>
  );
}
