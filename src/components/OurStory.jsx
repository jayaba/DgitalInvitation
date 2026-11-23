import { wedding } from '../config/wedding.js';
import { usePhoto } from '../hooks/usePhoto.js';
import CoupleNames from './CoupleNames.jsx';
import PhotoFrame from './PhotoFrame.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { Scroll } from './decor/Emblems.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';

/**
 * "Our Story", set like a magazine spread: a heading, the second photograph
 * with a small bouquet on its corner, and the words beside it (beneath it
 * on a phone), joined to the picture by a fine gold line.
 * Hidden until the photo is added.
 */
export default function OurStory() {
  const { story } = wedding.photos;
  const photo = usePhoto(story.file);
  if (photo.status !== 'ready') return null;

  return (
    <section id="story" className="section story">
      <div className="container">
        <SectionHeading eyebrow={story.eyebrow} title={story.title} />

        <div className={`story__spread story__spread--${photo.isLandscape ? 'landscape' : 'portrait'}`}>
          <Reveal className="story__print">
            <PhotoFrame photo={photo} alt={story.alt}>
              <PaintedCorner position="br" />
            </PhotoFrame>
          </Reveal>

          <Reveal className="story__words" delay={200}>
            <span className="story__quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="story__caption">{story.caption}</p>
            {story.text && <p className="story__body">{story.text}</p>}
            <CoupleNames as="p" className="story__names" />
            <Scroll />
            <p className="story__closing">{story.closing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
