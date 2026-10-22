import MonogramLink from '../components/MonogramLink.jsx';

export default function Header({ onReturnToTop }) {
  return (
    <header className="header wrap">
      <MonogramLink label="Alan Chen home" onClick={onReturnToTop} />
      <nav aria-label="Main navigation">
        <a href="#experience">Experience</a>
        <a href="#stack">Tech stack</a>
        <a href="#contact">Get in touch</a>
      </nav>
      <a
        className="header-resume"
        href="/alan-chen-resume.pdf"
        target="_blank"
        rel="noreferrer"
        aria-label="View resume PDF (opens in a new tab)"
      >
        <span className="resume-label">
          <span>Resume</span>
          <span className="pdf-label">PDF</span>
        </span>
      </a>
    </header>
  );
}
