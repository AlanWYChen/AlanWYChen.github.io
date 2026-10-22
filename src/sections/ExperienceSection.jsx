import { companies } from '../data/portfolio.js';
import CompanyCard from '../components/CompanyCard.jsx';
import SectionLabel from '../components/SectionLabel.jsx';

export default function ExperienceSection({
  activeCompany,
  enhanced,
  onExpandCompany,
  onCollapseCompany,
}) {
  const companyColumns = companies
    .map((company) => (company.className === activeCompany ? '2fr' : '1fr'))
    .join(' ');
  return (
    <section
      id="experience"
      className="experience section wrap"
      aria-labelledby="experience-title"
    >
      <SectionLabel>01 / EXPERIENCE</SectionLabel>
      <div className="section-heading">
        <h2 id="experience-title">
          Where I’ve
          <br />
          <span>been building.</span>
        </h2>
        <p>
          Software engineering across infrastructure, mobile platforms, and
          full-stack applications.
        </p>
      </div>
      <div
        className="companies"
        style={{ gridTemplateColumns: companyColumns }}
      >
        {companies.map((company) => (
          <CompanyCard
            company={company}
            enhanced={enhanced}
            key={company.name}
            open={activeCompany === company.className}
            onExpand={() => onExpandCompany(company.className)}
            onCollapse={() => onCollapseCompany(company.className)}
          />
        ))}
      </div>
      <div className="education">
        <img
          src="/logos/waterloo.png"
          alt="University of Waterloo"
          width="280"
          height="112"
          loading="lazy"
        />
        <div>
          <p className="education-label">Education</p>
          <h3>University of Waterloo</h3>
          <p>Honours Bachelor of Computer Science, Co-op</p>
        </div>
      </div>
    </section>
  );
}
