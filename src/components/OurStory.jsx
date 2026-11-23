import { wedding } from '../config/wedding.js';
import { usePhoto } from '../hooks/usePhoto.js';
import PhotoFrame from './PhotoFrame.jsx';
import Reveal from './Reveal.jsx';

/**
 * The second photograph, resting on a caption card that slips out from
 * behind it. The card never covers the picture. Hidden until the photo is added.
 */
export default function OurStory() {
  const { story } = wedding.photos;
  const photo = usePhoto(story.file);
  if (photo.status !== 'ready') return null;

  return (
    <section id="story" className="section story">
      <div className="container">
        <div className={`story__piece story__piece--${photo.isLandscape ? 'landscape' : 'portrait'}`}>
          <Reveal className="story__print">
            <PhotoFrame photo={photo} alt={story.alt} />
          </Reveal>

          <Reveal className="story__panel" delay={200}>
            <p className="eyebrow">{story.eyebrow}</p>
            <h2 className="story__caption">{story.caption}</h2>
            <span className="story__rule" aria-hidden="true" />
            {story.text && <p className="story__body">{story.text}</p>}
            <p className="story__sign">{wedding.couple.groom} &amp; {wedding.couple.bride}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
