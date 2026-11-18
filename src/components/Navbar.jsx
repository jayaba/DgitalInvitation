import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { wedding } from '../config/wedding.js';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#invitation', label: 'Invitation' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#details', label: 'Details' },
  { href: '#schedule', label: 'Schedule' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { groom, bride } = wedding.couple;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`nav ${isScrolled || isMenuOpen ? 'is-solid' : ''}`}>
      <div className="nav__bar">
        <a href="#home" className="nav__brand" onClick={closeMenu} aria-label={`${groom} and ${bride}`}>
          {groom[0]} <span>&amp;</span> {bride[0]}
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className={`nav__drawer ${isMenuOpen ? 'is-open' : ''}`} aria-label="Sections" hidden={!isMenuOpen}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
