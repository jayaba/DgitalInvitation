import { wedding } from '../config/wedding.js';
import { usePhoto } from '../hooks/usePhoto.js';
import PhotoFrame from './PhotoFrame.jsx';
import Reveal from './Reveal.jsx';
import { Divider } from './decor/Florals.jsx';

/** The second photograph, set beside a short caption. Hidden until the photo is added. */
export default function OurStory() {
  const { story } = wedding.photos;
  const photo = usePhoto(story.file);
  if (photo.status !== 'ready') return null;

  return (
    <section id="story" className="section story">
      <div className={`container story__layout ${photo.isLandscape ? 'story__layout--landscape' : ''}`}>
        <Reveal className="story__photo">
          <PhotoFrame photo={photo} alt={story.alt} className="photo--offset" />
        </Reveal>

        <Reveal className="story__text" delay={200}>
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 className="story__caption">{story.caption}</h2>
          <Divider />
          {story.text && <p className="story__body">{story.text}</p>}
          <p className="story__sign">{wedding.couple.groom} &amp; {wedding.couple.bride}</p>
        </Reveal>
      </div>
    </section>
  );
}
