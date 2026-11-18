import { ChevronDown } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import { Wreath } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';

export default function Hero() {
  const { tagline, subtitle } = wedding.hero;

  return (
    <section id="home" className="hero">
      <PaintedCorner position="tl" />
      <PaintedCorner position="br" />
      <Petals />

      <div className="hero__content">
        <p className="eyebrow">{tagline}</p>
        <div className="hero__wreath">
          <Wreath />
          <CoupleNames as="h1" className="names--stacked" />
        </div>
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
