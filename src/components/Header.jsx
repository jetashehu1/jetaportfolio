import { useEffect, useState } from 'react';
import { navigation, site } from '../data/site.js';
import { useBodyLock, useKeys, useScrolled } from '../lib/hooks.js';
import './Header.css';

export default function Header() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);

  useBodyLock(open);
  useKeys(open, { Escape: () => setOpen(false) });

  useEffect(() => {
    const close = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const state = open ? 'is-open' : scrolled ? 'is-solid' : 'is-over-hero';

  return (
    <header className={`header ${state}`}>
      <div className="header__bar container">
        <a href="#top" className="header__brand" onClick={() => setOpen(false)}>
          {site.name}
        </a>

        <nav className="header__nav" aria-label="Primary">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="header__toggle-line" />
          <span className="header__toggle-line" />
        </button>
      </div>

      <div id="mobile-menu" className="menu" aria-hidden={!open} inert={!open}>
        <nav className="menu__nav container" aria-label="Mobile">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="menu__link"
              style={{ '--i': index }}
              onClick={() => setOpen(false)}
            >
              <span className="menu__index">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="menu__foot container eyebrow">{site.role}</p>
      </div>
    </header>
  );
}
