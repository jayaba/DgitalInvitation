import { ChevronDown } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { usePhoto } from '../hooks/usePhoto.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import PhotoFrame from './PhotoFrame.jsx';
import { Wreath } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';

export default function Hero() {
  const { tagline, subtitle } = wedding.hero;
  const { hero } = wedding.photos;
  const photo = usePhoto(hero.file);
  const hasPhoto = photo.status === 'ready';

  return (
    <section id="home" className={`hero ${hasPhoto ? 'hero--photo' : ''}`}>
      <PaintedCorner position="tl" />
      <PaintedCorner position="br" />
      <Petals />

      <div className="hero__content">
        <p className="eyebrow">{tagline}</p>

        {hasPhoto ? (
          <>
            <CoupleNames as="h1" />
            <PhotoFrame photo={photo} alt={hero.alt} className="hero__photo">
              <PaintedCorner position="bl" />
            </PhotoFrame>
          </>
        ) : (
          // Until the photo is added, the names sit inside a wreath of leaves.
          <div className="hero__wreath">
            <Wreath />
            <CoupleNames as="h1" className="names--stacked" />
          </div>
        )}

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
