import { useEffect, useState } from 'react';
import { links, navigation, site } from '../data/site.js';
import { useActiveSection, useBodyLock, useKeys, useScrollDirection } from '../lib/hooks.js';
import { Link, matchRoute, useRouter } from '../lib/router.jsx';
import './Header.css';

export default function Header() {
  const { path } = useRouter();
  const isHome = matchRoute(path).name === 'home';
  const { scrolled, hidden } = useScrollDirection();
  const active = useActiveSection(
    navigation.map((item) => item.id),
    isHome,
  );
  const [open, setOpen] = useState(false);

  useBodyLock(open);
  useKeys(open, { Escape: () => setOpen(false) });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const close = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const classes = ['header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <div className="header__bar wrap">
        <Link to="/" className="header__brand label" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`header__link label ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="header__link label">
            Instagram <span className="arrow">↗</span>
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle label"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="menu" className="menu theme-dark" aria-hidden={!open} inert={!open}>
        <nav className="menu__nav wrap" aria-label="Mobile">
          {navigation.map((item, index) => (
            <Link
              key={item.id}
              to={item.href}
              className="menu__link"
              style={{ '--i': index }}
              onClick={() => setOpen(false)}
            >
              <span className="menu__index label">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="menu__foot wrap label">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="line-link">
            Instagram <span className="arrow">↗</span>
          </a>
          {links.behance && (
            <a href={links.behance} target="_blank" rel="noopener noreferrer" className="line-link">
              Behance <span className="arrow">↗</span>
            </a>
          )}
          <span className="menu__location">{site.location}</span>
        </div>
      </div>
    </header>
  );
}
