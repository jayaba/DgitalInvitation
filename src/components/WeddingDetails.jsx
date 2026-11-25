import { CalendarHeart, CalendarPlus, Landmark, MapPin, Navigation } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getCalendarLinks, getDateLabel } from '../utils/date.js';
import DateCalendar from './DateCalendar.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import { HeartClock, LinkedHearts, TravelPath } from './decor/VenueArt.jsx';

export default function WeddingDetails() {
  const { couple, venue } = wedding;
  const calendarLinks = getCalendarLinks();
  const poruwa = wedding.schedule.find((event) => event.art === 'poruwa');

  return (
    <section id="details" className="section details">
      <div className="container">
        <SectionHeading eyebrow="The Celebration" title="Wedding Details" />

        <Reveal className="details__couple">
          <div>
            <p className="details__role">Groom</p>
            <p className="details__person">{couple.groom}</p>
          </div>
          <span className="details__amp" aria-hidden="true">&amp;</span>
          <div>
            <p className="details__role">Bride</p>
            <p className="details__person">{couple.bride}</p>
          </div>
        </Reveal>

        <Reveal className="details__when">
          <DateCalendar />

          <div className="details__facts">
            <dl>
              <div className="details__fact">
                <CalendarHeart size={22} strokeWidth={1.400} aria-hidden="true" />
                <dt>Date</dt>
                <dd>{getDateLabel()}</dd>
              </div>
              {/* the ceremony time, taken from the schedule so it is set in one place */}
              {poruwa?.time && (
                <div className="details__fact">
                  <Landmark size={22} strokeWidth={1.400} aria-hidden="true" />
                  <dt>Poruwa</dt>
                  <dd>{poruwa.time}</dd>
                </div>
              )}
            </dl>

            {calendarLinks && (
              <div className="details__save">
                <p className="details__save-label">
                  <CalendarPlus size={15} aria-hidden="true" />
                  Add to your calendar
                </p>
                <div className="details__save-links">
                  <a className="btn btn--outline btn--small" href={calendarLinks.google}
                    target="_blank" rel="noopener noreferrer">
                    Google
                  </a>
                  <a className="btn btn--outline btn--small" href={calendarLinks.outlook}
                    target="_blank" rel="noopener noreferrer">
                    Outlook
                  </a>
                  <a className="btn btn--outline btn--small" href={calendarLinks.ics} download="wedding.ics">
                    Apple
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="venue">
          <PaintedCorner position="tl" />
          <PaintedCorner position="br" />
          <div className="venue__inner">
            <TravelPath />

            <p className="venue__label"><span>The Venue</span></p>
            <h3 className="venue__name">{venue.name}</h3>
            <p className="venue__location">
              <span>
                <MapPin size={16} strokeWidth={1.600} aria-hidden="true" />
                {venue.location}
              </span>
            </p>

            {/* the playful nudge: a clock beside two script lines */}
            <div className="venue__playful">
              <HeartClock />
              <p className="venue__late">
                {venue.lateLine.split(/(?<=[.!?])\s+/).map((sentence) => (
                  <span key={sentence}>{sentence} </span>
                ))}
              </p>
            </div>
            <p className="venue__where">{venue.whereLine}</p>

            <a className="btn venue__directions" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation size={17} aria-hidden="true" />
              Get Directions
            </a>

            <LinkedHearts />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
