export default function CompanyCard({ company, open, onExpand, onCollapse }) {
  return (
    <article
      className={`company${open ? ' is-expanded' : ''}`}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onExpand();
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === 'mouse' &&
          !event.currentTarget.contains(document.activeElement)
        )
          onCollapse();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onCollapse();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onCollapse();
      }}
    >
      <div className={`logo-container ${company.className}`}>
        <img
          src={`/logos/${company.logo}`}
          alt={company.name}
          width="220"
          height="90"
          loading="lazy"
        />
      </div>
      <h3>{company.name}</h3>
      <p className="role">{company.role}</p>
      <button
        className="company-toggle"
        aria-expanded={open}
        aria-controls={`intro-${company.className}`}
        onClick={onExpand}
        onFocus={(event) => {
          if (event.target.matches(':focus-visible')) onExpand();
        }}
      >
        About {company.name}
      </button>
      <div
        id={`intro-${company.className}`}
        className="company-intro"
        inert={!open}
        aria-hidden={!open}
      >
        <p>{company.intro}</p>
        <a href={company.url} target="_blank" rel="noreferrer">
          Visit company website
        </a>
      </div>
    </article>
  );
}
