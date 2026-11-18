import { wedding } from '../config/wedding.js';
import { getGuestGreeting } from '../utils/guest.js';
import CoupleNames from './CoupleNames.jsx';
import { Divider, FloralCorner } from './decor/Florals.jsx';

/** Full-screen cover shown first; lifts away when the guest opens the invitation. */
export default function OpeningScreen({ isLeaving, onOpen }) {
  const { eyebrow, note, button } = wedding.opening;
  const guestGreeting = getGuestGreeting();

  return (
    <div className={`opening ${isLeaving ? 'is-leaving' : ''}`}>
      <FloralCorner position="tl" />
      <FloralCorner position="br" />

      <div className="opening__card">
        <p className="eyebrow opening__item">{eyebrow}</p>
        <CoupleNames as="h1" className="names--stacked opening__item" />
        <Divider className="opening__item" />
        <p className="opening__note opening__item">{note}</p>
        {guestGreeting && <p className="opening__guest opening__item">{guestGreeting}</p>}
        <button type="button" className="btn opening__item" onClick={onOpen} disabled={isLeaving}>
          {button}
        </button>
      </div>
    </div>
  );
}
