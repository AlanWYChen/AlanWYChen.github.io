import { linkedin } from '../data/portfolio.js';
import SectionLabel from '../components/SectionLabel.jsx';
import SocialLink from '../components/SocialLink.jsx';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="contact section"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <SectionLabel>04 / SAY HELLO</SectionLabel>
        <p className="contact-intro">Have something in mind?</p>
        <h2 id="contact-title">
          Let’s get
          <br />
          <span>in touch.</span>
        </h2>
        <div className="contact-bottom">
          <a className="email-link" href="mailto:alan.ch3n@gmail.com">
            alan.ch3n@gmail.com
          </a>
          <nav className="contact-socials" aria-label="Social profiles">
            <SocialLink
              href={linkedin}
              label="LinkedIn profile"
              title="LinkedIn"
              icon="/logos/social/linkedin.svg"
            />
            <SocialLink
              href="https://github.com/AlanWYChen"
              label="GitHub profile"
              title="GitHub"
              icon="/logos/social/github.svg"
            />
          </nav>
        </div>
      </div>
    </section>
  );
}
