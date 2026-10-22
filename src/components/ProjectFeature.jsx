import { Fragment } from 'react';

export default function ProjectFeature({
  project,
  as: Element = 'article',
  id,
}) {
  const titleId = `${project.slug}-title`;

  return (
    <Element
      id={id}
      className="project-feature"
      aria-labelledby={Element === 'article' ? titleId : undefined}
    >
      <div className="project-copy">
        <p className="project-type">{project.type}</p>
        <h2 id={titleId}>
          {project.name}
          <span>.</span>
        </h2>
        <p className="project-lead">
          {project.lead.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <p>{project.description}</p>
        <ul className="project-features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="project-aside">{project.aside}</p>
        <a
          className="project-source"
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={project.sourceLabel}
        >
          <img src="/logos/social/github.svg" alt="" width="20" height="20" />
          View source on GitHub
        </a>
      </div>
      <figure className={project.image.className}>
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading="lazy"
        />
        <figcaption>{project.image.caption}</figcaption>
      </figure>
    </Element>
  );
}
