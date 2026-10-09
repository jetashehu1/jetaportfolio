import { Link } from '../lib/router.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found theme-dark">
      <div className="wrap">
        <p className="label">
          <span className="red">404</span> — Page not found
        </p>
        <h1 className="display">Out of frame.</h1>
        <Link to="/" className="label line-link">
          <span className="arrow">←</span> Back to the portfolio
        </Link>
      </div>
    </section>
  );
}
