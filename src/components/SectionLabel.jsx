export default function SectionLabel({ children }) {
  return (
    <div className="section-top">
      <p className="eyebrow">{children}</p>
      <span className="section-line" />
    </div>
  );
}
