import { useState } from 'react';
import { Heart, MailX, MessageCircle } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import { getGuestName } from '../utils/guest.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const digits = (number) => number.replace(/\D/g, '');

/** 94785882732 → "+94 78 588 2732" (other lengths are shown as "+digits"). */
function formatNumber(number) {
  const d = digits(number);
  const match = d.match(/^(94)(\d{2})(\d{3})(\d{4})$/);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : `+${d}`;
}

/** A WhatsApp link that opens a chat with the reply already written. */
function whatsappLink(number, reply) {
  const { groom, bride } = wedding.couple;
  const guest = getGuestName();
  const text = [
    `Dear ${groom} & ${bride},`,
    reply,
    `(Wedding invitation · ${getDateLabel()})`,
    guest ? `— ${guest}` : '— ',
  ].join('\n');
  return `https://wa.me/${digits(number)}?text=${encodeURIComponent(text)}`;
}

export default function Rsvp() {
  const { rsvp } = wedding;
  const [isAccepting, setIsAccepting] = useState(true);
  if (!rsvp.enabled) return null;

  const contacts = rsvp.whatsappContacts.filter((contact) => digits(contact.number));
  const reply = isAccepting ? rsvp.acceptText : rsvp.declineText;

  return (
    <section id="rsvp" className="section rsvp">
      <div className="container container--narrow">
        <SectionHeading eyebrow="RSVP" title={rsvp.title} />

        <Reveal as="p" className="rsvp__message">{rsvp.message}</Reveal>

        {contacts.length > 0 ? (
          <Reveal delay={150}>
            {/* Step 1: the answer */}
            <div className="rsvp__choice" role="group" aria-label="Your reply">
              <button type="button" className={`rsvp__option ${isAccepting ? 'is-selected' : ''}`}
                aria-pressed={isAccepting} onClick={() => setIsAccepting(true)}>
                <Heart size={16} aria-hidden="true" />
                {rsvp.acceptLabel}
              </button>
              <button type="button" className={`rsvp__option ${isAccepting ? '' : 'is-selected'}`}
                aria-pressed={!isAccepting} onClick={() => setIsAccepting(false)}>
                <MailX size={16} aria-hidden="true" />
                {rsvp.declineLabel}
              </button>
            </div>

            {/* Step 2: who to send it to */}
            <p className="rsvp__send-to">{rsvp.sendToLabel}</p>
            <div className="rsvp__actions">
              {contacts.map((contact) => (
                <a key={contact.number} className="btn" href={whatsappLink(contact.number, reply)}
                  target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" />
                  {contact.name || formatNumber(contact.number)}
                </a>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal as="p" className="rsvp__note" delay={150}>{rsvp.noNumberNote}</Reveal>
        )}

        {rsvp.replyBy && <Reveal as="p" className="rsvp__reply-by" delay={250}>{rsvp.replyBy}</Reveal>}
      </div>
    </section>
  );
}
