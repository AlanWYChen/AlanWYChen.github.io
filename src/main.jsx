import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const linkedin = 'https://www.linkedin.com/in/alan-wy-chen';
const companies = [
  { name: 'Scrawlr', logo: 'scrawlr.png', role: 'Software Engineer, Infrastructure', className: 'scrawlr', intro: 'Scrawlr builds products for social browsing, travel, and vacation rentals: Scrawlr connects conversations across the web, Jauntr offers flight rewards, and Lodgr helps guests book directly with hosts.', url: 'https://corporate.scrawlr.com/projects' },
  { name: 'UKG', logo: 'ukg-smile.svg', role: 'Software Engineer, Mobile Platform', className: 'ukg', intro: 'UKG makes HR, payroll, and workforce management software, helping organizations manage people, schedules, and pay.', url: 'https://www.ukg.com' },
  { name: 'Metergy Solutions', logo: 'metergy.svg', role: 'Software Engineer', className: 'metergy', intro: 'Metergy provides submetering for buildings, measuring individual electricity, water, gas, and thermal usage so residents and property teams can understand and manage utility costs.', url: 'https://www.metergysolutions.com' },
];
const stacks = [
  { title: 'Frontend', symbol: '</>', tools: ['React', 'Vue.js', 'SolidJS', 'AngularJS', 'TypeScript', 'JavaScript'] },
  { title: 'Backend', symbol: '{ }', tools: ['Python', 'FastAPI', 'Django', 'Node.js / Fastify', 'Java', 'Spring Boot', 'Go', 'C#', 'C++'] },
  { title: 'Mobile', symbol: '[ ]', tools: ['Ionic', 'Swift / SwiftUI', 'Kotlin / Jetpack Compose', 'Xcode', 'Android Studio'] },
  { title: 'Data', symbol: '::', tools: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'] },
  { title: 'Cloud & delivery', symbol: '⌘', tools: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Pulumi', 'GitHub Actions', 'CircleCI'] },
  { title: 'Observability', symbol: '*', tools: ['Sentry', 'Splunk', 'Prometheus', 'Grafana'] },
];

const techIcons = {
  "SolidJS": "solidjs",
  "AngularJS": "angularjs",
  "Xcode": "xcode",
  "Android Studio": "androidstudio",
  "React": "react",
  "Vue.js": "vuejs",
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "Python": "python",
  "FastAPI": "fastapi",
  "Django": "django",
  "Node.js / Fastify": "nodejs",
  "Java": "java",
  "Spring Boot": "spring",
  "Go": "go",
  "C#": "csharp",
  "C++": "cplusplus",
  "Ionic": "ionic",
  "Swift / SwiftUI": "swift",
  "Kotlin / Jetpack Compose": "kotlin",
  "PostgreSQL": "postgresql",
  "MySQL": "mysql",
  "SQLite": "sqlite",
  "Redis": "redis",
  "AWS": "amazonwebservices",
  "GCP": "googlecloud",
  "Docker": "docker",
  "Kubernetes": "kubernetes",
  "Terraform": "terraform",
  "Pulumi": "pulumi",
  "GitHub Actions": "githubactions",
  "CircleCI": "circleci",
  "Sentry": "sentry",
  "Splunk": "splunk",
  "Prometheus": "prometheus",
  "Grafana": "grafana"
};


function CompanyCard({ company }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const open = hovered || expanded;
  return (
    <article className="company" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onKeyDown={event => { if (event.key === 'Escape') { setHovered(false); setExpanded(false); } }}>
      <div className={`logo-container ${company.className}`}><img src={`/logos/${company.logo}`} alt={company.name} width="220" height="90" loading="lazy" /></div>
      <h3>{company.name}</h3>
      <p className="role">{company.role}</p>
      <button className="company-toggle" aria-expanded={open} aria-controls={`intro-${company.className}`} onClick={() => { setHovered(false); setExpanded(!expanded); }} onFocus={event => { if (event.target.matches(':focus-visible')) setExpanded(true); }}>About {company.name}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <div id={`intro-${company.className}`} className="company-intro" hidden={!open}><p>{company.intro}</p><a href={company.url} target="_blank" rel="noreferrer">Visit company website</a></div>
    </article>
  );
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="header wrap" id="top">
        <a className="monogram" href="#top" aria-label="Alan Chen home">ac<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#stack">Tech stack</a>
          <a href="#contact">Get in touch</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="name">
          <div className="hero-title">
            <div className="intro-line"><p>Hey, I’m</p><span aria-hidden="true" /></div>
            <h1 id="name">Alan Chen<span>.</span></h1>
            <div className="hero-caption"><p>SOFTWARE<br />ENGINEER</p></div>
          </div>
          <div className="hero-bottom">
            <p>I build across the stack.<br /><span>From the interface to the infrastructure.</span></p>
            <a className="scroll-link" href="#experience">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="experience" className="experience section wrap" aria-labelledby="experience-title">
          <div className="section-top"><p className="eyebrow">01 / EXPERIENCE</p><span className="section-line" /></div>
          <div className="section-heading"><h2 id="experience-title">Where I’ve<br /><span>been building.</span></h2><p>A little startup energy. A little enterprise scale.<br />A lot of learning along the way.</p></div>
          <div className="companies">{companies.map(company => (
            <CompanyCard company={company} key={company.name} />
          ))}</div>
          <div className="education"><img src="/logos/waterloo.png" alt="University of Waterloo" width="280" height="112" loading="lazy" /><div><h3>University of Waterloo</h3><p>Honours Bachelor of Computer Science, Co-op</p></div></div>
        </section>

        <section id="stack" className="stack section wrap" aria-labelledby="stack-title">
          <div className="section-top"><p className="eyebrow">02 / TOOLKIT</p><span className="section-line" /></div>
          <div className="section-heading"><h2 id="stack-title">My tech <span>stack.</span></h2><p>The tools I work with,<br />from the browser to the cloud.</p></div>
          <div className="stack-grid">{stacks.map(stack => (
            <article className="stack-group" key={stack.title}>
              <div className="stack-label"><span className="stack-symbol" aria-hidden="true">{stack.symbol}</span><h3>{stack.title}</h3></div>
              <ul>{stack.tools.map(tool => <li key={tool} className="tech-chip" tabIndex={0}><img src={`/logos/tech/${techIcons[tool]}.svg`} alt="" width="28" height="28" loading="lazy" /><span>{tool}</span></li>)}</ul>
            </article>
          ))}</div>
        </section>

        <section id="pick-pic" className="side-project section wrap" aria-labelledby="pick-pic-title">
          <div className="section-top"><p className="eyebrow">03 / ON THE SIDE</p><span className="section-line" /></div>
          <div className="project-feature">
            <div className="project-copy">
              <p className="project-type">MOBILE · GROUP PROJECT</p>
              <h2 id="pick-pic-title">Pick-pic<span>.</span></h2>
              <p className="project-lead">A shared space for photos.<br />A little friendly voting.</p>
              <p>A mobile side project I built with a group. Pick-pic brings shared photo collections and swipe-based voting together.</p>
              <ul className="project-features"><li>Shared photo collections</li><li>Swipe to vote</li><li>Invite friends</li></ul>
              <p className="project-aside">Yes, we tested it with cat memes.</p>
              <a className="project-source" href="https://github.com/AlanWYChen/Pick-Pic" target="_blank" rel="noreferrer"><img src="/logos/social/github.svg" alt="" width="20" height="20" />View source on GitHub</a>
            </div>
            <figure className="project-screen">
              <img src="/projects/pick-pic-gallery.png" alt="Pick-pic shared gallery showing cat photos and Invite, Filter, Upload, and Rank controls" width="853" height="1844" loading="lazy" />
              <figcaption>Pick-pic · Shared photo gallery</figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="contact section" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="section-top"><p className="eyebrow">04 / SAY HELLO</p><span className="section-line" /></div>
            <p className="contact-intro">Have something in mind?</p>
            <h2 id="contact-title">Let’s get<br /><span>in touch.</span></h2>
            <div className="contact-bottom"><a className="email-link" href="mailto:alan.ch3n@gmail.com">alan.ch3n@gmail.com</a><nav className="contact-socials" aria-label="Social profiles">
              <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><img src="/logos/social/linkedin.svg" alt="" width="24" height="24" /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" title="X (Twitter)"><img src="/logos/social/twitter.svg" alt="" width="24" height="24" /></a>
              <a href="https://github.com/AlanWYChen" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub"><img src="/logos/social/github.svg" alt="" width="24" height="24" /></a>
            </nav></div>
          </div>
        </section>
      </main>
      <footer className="footer wrap"><a className="monogram" href="#top" aria-label="Back to top">ac<span>.</span></a><p>Alan Chen</p><a href="/alan-chen-resume.pdf" download>Download resume</a></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
