import { useEffect, useRef, useState } from 'react';
import { wedding } from './config/wedding.js';
import OpeningScreen from './components/OpeningScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import InvitationMessage from './components/InvitationMessage.jsx';
import OurStory from './components/OurStory.jsx';
import BackToTop from './components/BackToTop.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingDetails from './components/WeddingDetails.jsx';
import Schedule from './components/Schedule.jsx';
import Rsvp from './components/Rsvp.jsx';
import Closing from './components/Closing.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import FlowerRain from './components/decor/FlowerRain.jsx';

/**
 * When each stage of the opening begins, in milliseconds after the tap.
 * The stages themselves are animated in the stylesheet (see `.opening`).
 */
const TIMELINE = { leaving: 550, opening: 1500, done: 3300 };
// For guests who prefer reduced motion: a quick, simple fade.
const TIMELINE_REDUCED = { leaving: 0, opening: 120, done: 500 };
// The flower rain starts as the welcome card fades, and is removed once the
// last flower has fallen off the bottom of the screen.
const RAIN_STARTS = 450;
const RAIN_ENDS = 13800;

export default function App() {
  // idle → pressed → leaving → opening → done
  const [phase, setPhase] = useState('idle');
  const [isRaining, setIsRaining] = useState(false);
  const hasStarted = useRef(false);
  const timers = useRef([]);
  const musicRef = useRef(null);

  const isOpen = phase === 'opening' || phase === 'done';

  useEffect(() => {
    // Always begin at the top, on the closed invitation, even after a reload.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Keep the page still until the invitation is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (hasStarted.current) return; // a second tap must not restart the sequence
    hasStarted.current = true;

    window.scrollTo(0, 0);
    // Started from the guest's tap, so browsers allow it.
    if (wedding.music.enabled && wedding.music.playOnOpen) {
      musicRef.current?.play();
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timeline = reduced ? TIMELINE_REDUCED : TIMELINE;

    setPhase('pressed');
    ['leaving', 'opening', 'done'].forEach((next) => {
      timers.current.push(setTimeout(() => setPhase(next), timeline[next]));
    });

    if (!reduced) {
      timers.current.push(setTimeout(() => setIsRaining(true), RAIN_STARTS));
      timers.current.push(setTimeout(() => setIsRaining(false), RAIN_ENDS));
    }
  };

  return (
    <div className={`app ${isOpen ? 'is-open' : ''}`}>
      {phase !== 'done' && <OpeningScreen phase={phase} onOpen={handleOpen} />}

      <div aria-hidden={!isOpen}>
        <Navbar />
        <main>
          <Hero />
          <InvitationMessage />
          <OurStory />
          <Countdown />
          <WeddingDetails />
          <Schedule />
          <Rsvp />
        </main>
        <Closing />
      </div>

      {isRaining && <FlowerRain />}
      {isOpen && <BackToTop />}
      {wedding.music.enabled && <MusicPlayer ref={musicRef} isVisible={isOpen} />}
    </div>
  );
}
