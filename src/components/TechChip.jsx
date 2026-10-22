export default function TechChip({ icon, label }) {
  return (
    <li className="tech-chip" tabIndex={0}>
      <img
        src={`/logos/tech/${icon}.svg`}
        alt=""
        width="28"
        height="28"
        loading="lazy"
      />
      <span>{label}</span>
    </li>
  );
}
