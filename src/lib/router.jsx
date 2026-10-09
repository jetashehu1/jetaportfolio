import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/**
 * Minimal History-API router — the site only has two kinds of pages
 * (home and /work/:slug), so a routing library would be dead weight.
 * Handles: link interception, hash scrolling, scroll restoration and a short
 * fade between pages.
 */

const RouterContext = createContext({ path: '/', navigate: () => {} });
const LEAVE_MS = 380;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToHash(hash, smooth = true) {
  const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (target) target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  return Boolean(target);
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => window.location.pathname);
  const pending = useRef(null);
  const currentPath = useRef(path);
  currentPath.current = path;

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash, false));

    const onPop = (event) => {
      const next = { scrollY: event.state?.scrollY ?? 0, hash: window.location.hash };
      if (window.location.pathname === currentPath.current) {
        if (!(next.hash && scrollToHash(next.hash))) window.scrollTo(0, next.scrollY);
        return;
      }
      pending.current = next;
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After a page swap: restore scroll / jump to hash / go to top.
  useEffect(() => {
    const next = pending.current;
    pending.current = null;
    document.documentElement.classList.remove('is-leaving');
    if (!next) return;
    requestAnimationFrame(() => {
      if (next.hash && scrollToHash(next.hash, false)) return;
      window.scrollTo(0, next.scrollY ?? 0);
    });
  }, [path]);

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.href);
    if (url.origin !== window.location.origin) {
      window.location.href = to;
      return;
    }

    // Same page, only a hash: smooth scroll.
    if (url.pathname === window.location.pathname) {
      if (url.hash) {
        window.history.pushState({ scrollY: 0 }, '', url.pathname + url.hash);
        scrollToHash(url.hash);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
    const swap = () => {
      window.history.pushState({ scrollY: 0 }, '', url.pathname + url.hash);
      pending.current = { scrollY: 0, hash: url.hash };
      setPath(url.pathname);
    };

    if (prefersReducedMotion()) swap();
    else {
      document.documentElement.classList.add('is-leaving');
      window.setTimeout(swap, LEAVE_MS);
    }
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

/** <a> that routes internally; external links and modified clicks behave normally. */
export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter();
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === '_blank'
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

/** Route table. */
export function matchRoute(path) {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean === '/') return { name: 'home' };
  const project = clean.match(/^\/work\/([a-z0-9-]+)$/i);
  if (project) return { name: 'project', slug: project[1].toLowerCase() };
  return { name: 'not-found' };
}
