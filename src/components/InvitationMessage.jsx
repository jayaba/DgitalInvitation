import { wedding } from '../config/wedding.js';
import { getGuestGreeting } from '../utils/guest.js';
import Reveal from './Reveal.jsx';
import { Divider } from './decor/Florals.jsx';

export default function InvitationMessage() {
  const { title, paragraphs } = wedding.invitation;
  const { groom, bride } = wedding.couple;
  const guestGreeting = getGuestGreeting();

  return (
    <section id="invitation" className="section invitation">
      <div className="container container--narrow">
        {/* An arched sheet, echoing the card on the opening screen */}
        <Reveal className="invitation__frame">
          <p className="invitation__monogram" aria-hidden="true">
            {groom[0]}<span>&amp;</span>{bride[0]}
          </p>
          <h2 className="section-heading__title">{title}</h2>
          <Divider />
          {guestGreeting && <p className="invitation__guest">{guestGreeting},</p>}
          {paragraphs.map((text) => (
            <p key={text} className="invitation__text">{text}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
