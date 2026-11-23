import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/** Small round button that appears once the guest has scrolled down. */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#home"
      className={`to-top ${isVisible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronUp size={20} />
    </a>
  );
}
