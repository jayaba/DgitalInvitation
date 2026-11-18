import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { wedding } from '../config/wedding.js';

const MUSIC_SRC = `${import.meta.env.BASE_URL}${wedding.music.file}`;

/**
 * Floating play/pause button for the background music.
 * Music never starts by itself — only from a tap (this button, or the
 * "Open Invitation" button when `music.playOnOpen` is true).
 */
const MusicPlayer = forwardRef(function MusicPlayer({ isVisible }, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = wedding.music.volume;
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(id);
  }, [notice]);

  const play = async ({ quiet = false } = {}) => {
    try {
      await audioRef.current.play();
    } catch {
      // Most often the music file has not been added yet.
      if (!quiet) setNotice('Music file not found — see public/music/README.txt');
    }
  };

  useImperativeHandle(ref, () => ({ play: () => play({ quiet: true }) }));

  const toggle = () => {
    if (isPlaying) audioRef.current.pause();
    else play();
  };

  return (
    <div className={`music ${isVisible ? 'is-visible' : ''}`}>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {notice && <p className="music__notice" role="status">{notice}</p>}
      <button
        type="button"
        className={`music__button ${isPlaying ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isPlaying}
        tabIndex={isVisible ? 0 : -1}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </div>
  );
});

export default MusicPlayer;
