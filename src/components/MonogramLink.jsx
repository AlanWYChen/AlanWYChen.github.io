export default function MonogramLink({ label, onClick }) {
  return (
    <a className="monogram" href="#top" onClick={onClick} aria-label={label}>
      ac<span>.</span>
    </a>
  );
}
