import { wedding } from '../config/wedding.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { getDateLabel, weddingDate } from '../utils/date.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const UNITS = ['days', 'hours', 'minutes', 'seconds'];

export default function Countdown() {
  const remaining = useCountdown(weddingDate);
  const { title, finishedMessage } = wedding.countdown;

  return (
    <section id="countdown" className="section countdown">
      <div className="container">
        <SectionHeading eyebrow={getDateLabel()} title={title} />

        {remaining.isFinished ? (
          <Reveal as="p" className="countdown__finished">{finishedMessage}</Reveal>
        ) : (
          <Reveal className="countdown__grid" role="timer" aria-label="Time until the wedding">
            {UNITS.map((unit) => (
              <div key={unit} className="countdown__unit">
                <span className="countdown__value">
                  {String(remaining[unit]).padStart(2, '0')}
                </span>
                <span className="countdown__label">{unit}</span>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
