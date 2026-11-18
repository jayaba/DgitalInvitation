import { useEffect, useRef, useState } from 'react';
import { wedding } from './config/wedding.js';
import OpeningScreen from './components/OpeningScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import InvitationMessage from './components/InvitationMessage.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingDetails from './components/WeddingDetails.jsx';
import Schedule from './components/Schedule.jsx';
import Closing from './components/Closing.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

const OPENING_EXIT_MS = 1100;

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const musicRef = useRef(null);

  // Keep the page still behind the opening screen.
  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => {
    window.scrollTo(0, 0);
    setIsOpen(true);
    // Started from the guest's tap, so browsers allow it.
    if (wedding.music.enabled && wedding.music.playOnOpen) {
      musicRef.current?.play();
    }
    setTimeout(() => setShowOpening(false), OPENING_EXIT_MS);
  };

  return (
    <div className={`app ${isOpen ? 'is-open' : ''}`}>
      {showOpening && <OpeningScreen isLeaving={isOpen} onOpen={handleOpen} />}

      <div aria-hidden={!isOpen}>
        <Navbar />
        <main>
          <Hero />
          <InvitationMessage />
          <Countdown />
          <WeddingDetails />
          <Schedule />
        </main>
        <Closing />
      </div>

      {wedding.music.enabled && <MusicPlayer ref={musicRef} isVisible={isOpen} />}
    </div>
  );
}
