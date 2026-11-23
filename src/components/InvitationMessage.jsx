import { Calendar } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getShortDateLabel } from '../utils/date.js';
import { getGuestGreeting } from '../utils/guest.js';
import CoupleNames from './CoupleNames.jsx';
import Reveal from './Reveal.jsx';
import { HeartFlourish, Monogram, Scroll } from './decor/Emblems.jsx';
import { Divider, Lavender } from './decor/Florals.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';

/**
 * The invitation itself, laid out like a piece of printed stationery:
 * the couple's emblem, the heading, their names, a personal greeting,
 * the wording and the date, inside a gold frame with a bouquet in two
 * opposite corners. Everything is live text and SVG — no flattened image.
 */
export default function InvitationMessage() {
  const { title, intro, message, supportingMessage } = wedding.invitation;
  const { groom, bride } = wedding.couple;
  const guestGreeting = getGuestGreeting();

  return (
    <section id="invitation" className="section invitation">
      <div className="container container--narrow">
        <Reveal className="invite-card">
          {/* gold frame with notched corners */}
          <div className="invite-card__frame" aria-hidden="true">
            <span className="invite-card__frame-line" />
            <i /><i /><i /><i />
          </div>

          <PaintedCorner position="tl" />
          <PaintedCorner position="br" />

          <div className="invite-card__inner">
            <Monogram first={groom[0]} second={bride[0]} />

            <h2 className="invite-card__title"><span>{title}</span></h2>
            <p className="invite-card__intro">{intro}</p>
            <CoupleNames as="p" className="invite-card__names" />
            <HeartFlourish />

            {/* shown only when the link carries a guest's name (?to=Name) */}
            {guestGreeting && (
              <p className="invite-card__guest">
                <span>{guestGreeting},</span>
                <svg viewBox="0 0 34 40" aria-hidden="true" focusable="false">
                  <Lavender x={10} y={38} r={24} s={0.340} />
                  <Lavender x={10} y={38} r={52} s={0.260} />
                </svg>
              </p>
            )}

            <p className="invite-card__text">{message}</p>
            <Divider />
            <p className="invite-card__support">{supportingMessage}</p>

            <div className="invite-card__date">
              <Scroll />
              <p className="invite-card__date-plaque">
                <Calendar size={20} strokeWidth={1.400} aria-hidden="true" />
                <span>{getShortDateLabel()}</span>
              </p>
              <Scroll className="scroll--flipped" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
