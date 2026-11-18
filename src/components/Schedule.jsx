import { wedding } from '../config/wedding.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { Blossom } from './decor/Florals.jsx';

export default function Schedule() {
  const { schedule, date } = wedding;

  return (
    <section id="schedule" className="section schedule">
      <div className="container container--narrow">
        <SectionHeading eyebrow="Order of the Day" title="Wedding Day Schedule" />

        <ol className="timeline">
          {schedule.map((event, i) => (
            <Reveal as="li" key={event.title} delay={i * 120} className="timeline__item">
              <Blossom className="timeline__marker" tone={i % 2 ? 'rose' : 'lavender'} />
              <p className="timeline__time">{event.time || date.timePendingLabel}</p>
              <h3 className="timeline__title">{event.title}</h3>
              {event.description && <p className="timeline__text">{event.description}</p>}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
