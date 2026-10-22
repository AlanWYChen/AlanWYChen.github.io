import SectionLabel from '../components/SectionLabel.jsx';
import ProjectFeature from '../components/ProjectFeature.jsx';
import { pickPicProject, stampedeProject } from '../data/projects.js';

export default function ProjectsSection() {
  return (
    <section
      id="pick-pic"
      className="side-project section wrap"
      aria-label="Side projects"
    >
      <SectionLabel>03 / ON THE SIDE</SectionLabel>
      <ProjectFeature as="div" project={pickPicProject} />
      <ProjectFeature id="stampede" project={stampedeProject} />
    </section>
  );
}
