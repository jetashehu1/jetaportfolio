import { useState } from 'react';
import { site } from '../data/site.js';
import { getProject, nextProject, projectIndex, projects } from '../data/projects.js';
import { useDocumentMeta } from '../lib/hooks.js';
import NextProject from '../components/NextProject.jsx';
import ProjectGallery from '../components/ProjectGallery.jsx';
import ProjectHero from '../components/ProjectHero.jsx';
import VideoModal from '../components/VideoModal.jsx';
import NotFound from './NotFound.jsx';

export default function Project({ slug }) {
  const project = getProject(slug);
  const [playing, setPlaying] = useState(null);

  useDocumentMeta(
    project ? `${project.client} — ${site.name}` : `Not found — ${site.name}`,
    project ? `${project.client}: ${project.services.join(', ')}. ${site.description}` : site.description,
  );

  if (!project) return <NotFound />;

  return (
    <article className="project-page theme-dark">
      <ProjectHero
        project={project}
        number={projectIndex(slug) + 1}
        total={projects.length}
        onPlay={() =>
          setPlaying({ src: project.cover.video, poster: project.cover.image, ratio: '16 / 9', title: project.client })
        }
      />
      <ProjectGallery project={project} />
      <NextProject project={nextProject(slug)} />
      <VideoModal item={playing} onClose={() => setPlaying(null)} />
    </article>
  );
}
