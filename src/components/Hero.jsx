import { ChevronDown } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { usePhoto } from '../hooks/usePhoto.js';
import { getDateLabel } from '../utils/date.js';
import CoupleNames from './CoupleNames.jsx';
import PhotoFrame from './PhotoFrame.jsx';
import { Divider, Wreath } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';

export default function Hero() {
  const { heading, tagline, inviteLead, inviteNote } = wedding.hero;
  const { hero } = wedding.photos;
  const photo = usePhoto(hero.file);
  const hasPhoto = photo.status === 'ready';

  return (
    <section id="home" className={`hero ${hasPhoto ? 'hero--photo' : ''}`}>
      <PaintedCorner position="tl" />
      <PaintedCorner position="br" />
      <Petals count={20} />

      <div className="hero__content">
        {hasPhoto ? (
          <CoupleNames as="h1" />
        ) : (
          // Until the photo is added, the names sit inside a wreath of leaves.
          <div className="hero__wreath">
            <Wreath />
            <CoupleNames as="h1" className="names--stacked" />
          </div>
        )}

        <Divider className="hero__flourish" />
        <p className="hero__heading">{heading}</p>
        <p className="hero__tagline">{tagline}</p>

        {hasPhoto && (
          <PhotoFrame photo={photo} alt={hero.alt} className="hero__photo">
            <PaintedCorner position="bl" />
          </PhotoFrame>
        )}

        <p className="hero__date">{getDateLabel()}</p>
        <p className="hero__venue">
          {wedding.venue.name}
          <br />
          {wedding.venue.location}
        </p>
        <div className="hero__invite">
          {/* each sentence stays whole, so a narrow screen breaks between them */}
          <p className="hero__invite-lead">
            {inviteLead.split(/(?<=[.!?])\s+/).map((sentence) => (
              <span key={sentence}>{sentence} </span>
            ))}
          </p>
          <p className="hero__invite-note">{inviteNote}</p>
        </div>
      </div>

      <a href="#invitation" className="hero__scroll" aria-label="Scroll to the invitation">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
