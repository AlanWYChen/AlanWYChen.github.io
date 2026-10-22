import { useLayoutEffect, useState } from 'react';
import Header from './layout/Header.jsx';
import HeroSection from './sections/HeroSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import TechStackSection from './sections/TechStackSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import Footer from './layout/Footer.jsx';

export default function App() {
  const [activeCompany, setActiveCompany] = useState(null);
  const [enhanced, setEnhanced] = useState(false);
  useLayoutEffect(() => {
    if (!enhanced) {
      setEnhanced(true);
      return;
    }
    // Hydration changes card heights. Restore the fragment after that layout
    // and again after the browser finishes restoring scroll on page load.
    let frame;
    const restoreFragment = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        target?.scrollIntoView({ behavior: 'instant' });
      });
    };
    restoreFragment();
    window.addEventListener('pageshow', restoreFragment);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', restoreFragment);
    };
  }, [enhanced]);
  function returnToTop(event) {
    event.preventDefault();
    setActiveCompany(null);
    window.history.replaceState(null, '', '#top');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (event.detail === 0) {
      document.querySelector('header .monogram').focus({ preventScroll: true });
    } else {
      document.activeElement?.blur();
    }
  }
  return (
    <>
      <div id="top" className="page-top" aria-hidden="true" />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header onReturnToTop={returnToTop} />
      <main id="main">
        <HeroSection />
        <ExperienceSection
          activeCompany={activeCompany}
          enhanced={enhanced}
          onExpandCompany={setActiveCompany}
          onCollapseCompany={(company) =>
            setActiveCompany((current) =>
              current === company ? null : current,
            )
          }
        />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer onReturnToTop={returnToTop} />
    </>
  );
}
