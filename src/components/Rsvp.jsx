import { useState } from 'react';
import { Check, Heart, HeartCrack, MessageCircle, PartyPopper } from 'lucide-react';
import { wedding } from '../config/wedding.js';
import { getDateLabel } from '../utils/date.js';
import { getGuestName } from '../utils/guest.js';
import Reveal from './Reveal.jsx';
import { HeartFlourish } from './decor/Emblems.jsx';
import PaintedCorner from './decor/PaintedCorner.jsx';
import Petals from './decor/Petals.jsx';
import { RsvpEnvelope } from './decor/RsvpArt.jsx';
import { LinkedHearts } from './decor/VenueArt.jsx';

const digits = (number) => number.replace(/\D/g, '');

/** 94785882732 → "+94 78 588 2732" (other lengths are shown as "+digits"). */
function formatNumber(number) {
  const d = digits(number);
  const match = d.match(/^(94)(\d{2})(\d{3})(\d{4})$/);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : `+${d}`;
}

/**
 * A WhatsApp link that opens a chat with the message already written.
 * `reply` is the guest's answer; it is left out if they have not chosen yet.
 */
function whatsappLink(number, reply) {
  const { groom, bride } = wedding.couple;
  const guest = getGuestName();
  const text = [
    `Dear ${groom} & ${bride},`,
    reply,
    `(Wedding invitation · ${getDateLabel()})`,
    guest ? `— ${guest}` : '— ',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${digits(number)}?text=${encodeURIComponent(text)}`;
}

/**
 * A personal note asking the guest to come. They pick one of two cards, the
 * page answers warmly, and the WhatsApp buttons beneath carry their choice
 * to the couple in a ready-written message.
 */
export default function Rsvp() {
  const { rsvp } = wedding;
  const [answer, setAnswer] = useState(null); // 'accept' | 'decline' | null
  if (!rsvp.enabled) return null;

  const guest = getGuestName();
  const contacts = rsvp.whatsappContacts.filter((contact) => digits(contact.number));

  const choices = [
    { id: 'accept', label: rsvp.acceptLabel, Icon: PartyPopper },
    { id: 'decline', label: rsvp.declineLabel, Icon: HeartCrack },
  ];
  const confirmation = { accept: rsvp.acceptConfirmation, decline: rsvp.declineConfirmation }[answer];
  const reply = { accept: rsvp.acceptText, decline: rsvp.declineText }[answer];

  return (
    <section id="rsvp" className="section rsvp">
      <PaintedCorner position="tr" />
      <Petals count={14} />

      <div className="container container--narrow">
        <Reveal className="rsvp__heading">
          <p className="rsvp__label"><span>{rsvp.eyebrow}</span></p>
          <h2 className="section-heading__title">{rsvp.title}</h2>
          <HeartFlourish />
        </Reveal>

        <Reveal className="rsvp__note-from-us" delay={120}>
          <RsvpEnvelope />
          {guest && <p className="rsvp__dear">{guest},</p>}
          <p className="rsvp__lead">{rsvp.message}</p>
          <p className="rsvp__support">{rsvp.supportingMessage}</p>
        </Reveal>

        {/* the main interaction: two invitation-style cards */}
        <Reveal className="reply" delay={220} role="group" aria-label="Your reply">
          {choices.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`reply__card reply__card--${id} ${answer === id ? 'is-selected' : ''}`}
              aria-pressed={answer === id}
              onClick={() => setAnswer(id)}
            >
              <span className="reply__icon"><Icon size={20} strokeWidth={1.600} aria-hidden="true" /></span>
              <span className="reply__label">{label}</span>
              <span className="reply__check" aria-hidden="true"><Check size={14} strokeWidth={2.600} /></span>
            </button>
          ))}
        </Reveal>

        <div className="rsvp__answer" aria-live="polite">
          {confirmation && (
            // keyed so the message animates in again when the choice changes
            <p key={answer} className={`rsvp__confirmation rsvp__confirmation--${answer}`}>
              <Heart size={16} fill="currentColor" aria-hidden="true" />
              <span>{confirmation}</span>
            </p>
          )}
        </div>

        <Reveal className="rsvp__contact" delay={300}>
          <LinkedHearts />
          {contacts.length > 0 ? (
            <>
              <p className="rsvp__contact-label">{rsvp.contactLabel}</p>
              <div className="rsvp__contacts">
                {contacts.map((contact) => (
                  <a key={contact.number} className="rsvp__chip" href={whatsappLink(contact.number, reply)}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={`Message ${contact.name || formatNumber(contact.number)} on WhatsApp`}>
                    <MessageCircle size={16} strokeWidth={1.700} aria-hidden="true" />
                    {contact.name || formatNumber(contact.number)}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="rsvp__contact-label">{rsvp.noNumberNote}</p>
          )}
          {rsvp.replyBy && <p className="rsvp__reply-by">{rsvp.replyBy}</p>}
        </Reveal>
      </div>
    </section>
  );
}
