import MonogramLink from '../components/MonogramLink.jsx';

export default function Footer({ onReturnToTop }) {
  return (
    <footer className="footer wrap">
      <MonogramLink label="Back to top" onClick={onReturnToTop} />
      <p>Alan Chen</p>
    </footer>
  );
}
