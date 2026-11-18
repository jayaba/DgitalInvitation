import { ChevronDown } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import { Divider, FloralCorner } from './decor/Florals.jsx';

export default function Hero() {
  const { tagline, subtitle } = wedding.hero;

  return (
    <section id="home" className="hero">
      <FloralCorner position="tl" />
      <FloralCorner position="br" />

      <div className="hero__content">
        <p className="eyebrow">{tagline}</p>
        <CoupleNames as="h1" />
        <Divider />
        <p className="hero__date">{getDateLabel()}</p>
        <p className="hero__venue">
          {wedding.venue.name}
          <br />
          {wedding.venue.location}
        </p>
        <p className="hero__subtitle">{subtitle}</p>
      </div>

      <a href="#invitation" className="hero__scroll" aria-label="Scroll to the invitation">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
