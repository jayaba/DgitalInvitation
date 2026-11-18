import { wedding } from '../config/wedding.js';
import { getGuestGreeting } from '../utils/guest.js';
import Reveal from './Reveal.jsx';
import { Divider, Posy } from './decor/Florals.jsx';

export default function InvitationMessage() {
  const { title, paragraphs } = wedding.invitation;
  const guestGreeting = getGuestGreeting();

  return (
    <section id="invitation" className="section invitation">
      <div className="container container--narrow">
        <Reveal>
          <Posy />
          <h2 className="section-heading__title">{title}</h2>
          <Divider />
          {guestGreeting && <p className="invitation__guest">{guestGreeting},</p>}
        </Reveal>
        {paragraphs.map((text, i) => (
          <Reveal as="p" key={text} delay={150 + i * 150} className="invitation__text">
            {text}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
