export default function StackLabel({ symbol, title }) {
  return (
    <div className="stack-label">
      <span className="stack-symbol" aria-hidden="true">
        {symbol}
      </span>
      <h3>{title}</h3>
    </div>
  );
}
