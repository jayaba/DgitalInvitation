import { Heart, Music, PartyPopper, Users, Utensils } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const ICONS = {
  guests: Users,
  heart: Heart,
  celebration: PartyPopper,
  meal: Utensils,
  music: Music,
};

export default function Schedule() {
  const { schedule, date } = wedding;

  return (
    <section id="schedule" className="section schedule">
      <div className="container container--narrow">
        <SectionHeading eyebrow="Order of the Day" title="Wedding Day Schedule" />

        <ol className="timeline">
          {schedule.map((event, i) => {
            const Icon = ICONS[event.icon] || Heart;
            return (
              <Reveal as="li" key={event.title} delay={i * 120} className="timeline__item">
                <span className="timeline__marker" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.500} />
                </span>
                <p className="timeline__time">{event.time || date.timePendingLabel}</p>
                <h3 className="timeline__title">{event.title}</h3>
                {event.description && <p className="timeline__text">{event.description}</p>}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
