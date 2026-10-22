export default function SocialLink({ href, label, title, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={title}
    >
      <img src={icon} alt="" width="24" height="24" />
    </a>
  );
}
