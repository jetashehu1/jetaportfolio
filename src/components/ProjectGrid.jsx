import { getProject, projects, workLayout } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';
import './ProjectGrid.css';

/** Selected Work: irregular, book-like composition defined in projects.js → workLayout. */
export default function ProjectGrid() {
  const numberOf = (slug) => projects.findIndex((project) => project.slug === slug) + 1;

  return (
    <section className="work section theme-dark" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionLabel index={2} aside={`${String(projects.length).padStart(2, '0')} projects`}>
          Selected Work
        </SectionLabel>

        <div className="work__head">
          <RevealText
            id="work-title"
            className="display"
            lines={['Selected', { text: 'Work', className: 'work__indent' }]}
          />
          <Reveal as="p" className="copy work__note" delay={200}>
            Photography, film and content for brands, people and places.
          </Reveal>
        </div>

        <div className="work__rows">
          {workLayout.map((row, rowIndex) => (
            <div className="work__row" key={rowIndex}>
              {row.map((cell) => {
                const project = getProject(cell.slug);
                if (!project) return null;
                return (
                  <ProjectCard
                    key={cell.slug}
                    project={project}
                    number={numberOf(cell.slug)}
                    ratio={cell.ratio}
                    size={cell.size}
                    style={{ '--col': cell.col, '--offset': `${cell.offset || 0}rem` }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
