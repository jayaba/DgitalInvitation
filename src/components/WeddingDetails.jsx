import { CalendarHeart, CalendarPlus, Clock, MapPin, Navigation } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getCalendarLinks, getDateLabel, getTimeLabel } from '../utils/date.js';
import DateCalendar from './DateCalendar.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';

export default function WeddingDetails() {
  const { couple, venue } = wedding;
  const calendarLinks = getCalendarLinks();

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
              <div className="details__fact">
                <Clock size={22} strokeWidth={1.400} aria-hidden="true" />
                <dt>Time</dt>
                <dd>{getTimeLabel()}</dd>
              </div>
            </dl>

            {calendarLinks && (
              <p className="details__save">
                <a className="btn btn--outline" href={calendarLinks.google} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus size={16} aria-hidden="true" />
                  Save to Calendar
                </a>
                <a className="details__save-alt" href={calendarLinks.ics} download="wedding.ics">
                  Apple / Outlook calendar
                </a>
              </p>
            )}
          </div>
        </Reveal>

        <Reveal className="venue">
          <PaintedCorner position="tl" />
          <PaintedCorner position="br" />
          <div className="venue__inner">
            <MapPin size={26} strokeWidth={1.300} aria-hidden="true" />
            <p className="eyebrow">The Venue</p>
            <h3 className="venue__name">{venue.name}</h3>
            <p className="venue__location">{venue.location}</p>
            <a className="btn" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} aria-hidden="true" />
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
