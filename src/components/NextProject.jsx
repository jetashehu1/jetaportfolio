import { Link } from '../lib/router.jsx';
import RevealText from './RevealText.jsx';
import Rule from './Rule.jsx';
import './NextProject.css';

export default function NextProject({ project }) {
  return (
    <section className="next-project theme-cream" aria-label="Next project">
      <Link to={`/work/${project.slug}`} className="next-project__link wrap" data-cursor="View">
        <span className="next-project__head label">
          <span>Next project</span>
          <span className="arrow">→</span>
        </span>
        <Rule red />
        <RevealText
          as="span"
          className="display fit-line next-project__title"
          lines={[project.client]}
          style={{ '--chars': project.client.length }}
        />
        <span className="next-project__summary label">{project.summary}</span>
      </Link>
    </section>
  );
}
