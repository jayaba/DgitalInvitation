import { Clock, Heart, Infinity as InfinityIcon, Landmark, Music, PartyPopper, Users, Utensils, Wine } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import Reveal from './Reveal.jsx';
import { HeartFlourish } from './decor/Emblems.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';
import { BowDivider, PoruwaArt, ReceptionArt, WelcomeArt } from './decor/ScheduleArt.jsx';

// Icons for the round markers on the timeline (`icon` in the config).
const ICONS = {
  guests: Users,
  poruwa: Landmark,
  cheers: Wine,
  heart: Heart,
  celebration: PartyPopper,
  meal: Utensils,
  music: Music,
};

// Illustrations shown on each card (`art` in the config).
const ART = {
  welcome: WelcomeArt,
  poruwa: PoruwaArt,
  reception: ReceptionArt,
};

/**
 * The order of the day: three connected cards on a gold timeline, each with
 * a time ribbon, a title, a line of description, a playful note and its own
 * illustration. All wording comes from `schedule` in the config.
 */
export default function Schedule() {
  const { schedule, scheduleHeading } = wedding;

  return (
    <section id="schedule" className="section schedule">
      <PaintedCorner position="tl" />
      <PaintedCorner position="tr" />
      <Petals count={20} />

      <div className="container">
        <Reveal className="schedule__heading">
          <p className="schedule__eyebrow"><span>{scheduleHeading.eyebrow}</span></p>
          <h2 className="schedule__title">{scheduleHeading.title}</h2>
          <HeartFlourish />
        </Reveal>

        <ol className="events">
          {schedule.map((event, i) => {
            const Icon = ICONS[event.icon] || Heart;
            const Art = ART[event.art];
            const TimeIcon = event.timeIcon === 'infinity' ? InfinityIcon : Clock;

            return (
              <Reveal as="li" key={event.title} delay={i * 120}
                className={`event ${event.featured ? 'event--featured' : ''}`}>
                <span className="event__marker" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.500} />
                </span>

                <div className="event__card">
                  <div className="event__body">
                    <p className="event__time">
                      <TimeIcon size={17} strokeWidth={1.800} aria-hidden="true" />
                      {event.time || scheduleHeading.timePending}
                      {event.timeIcon === 'infinity' && (
                        <InfinityIcon size={17} strokeWidth={1.800} aria-hidden="true" />
                      )}
                    </p>
                    <h3 className="event__title">{event.title}</h3>
                    {event.description && <p className="event__text">{event.description}</p>}
                    {event.note && <p className="event__note">{event.note}</p>}
                  </div>

                  {Art && (
                    <div className="event__art">
                      <Art />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

        <BowDivider />
      </div>
    </section>
  );
}
