import StackLabel from './StackLabel.jsx';
import TechChip from './TechChip.jsx';

export default function StackGroup({ title, symbol, tools }) {
  return (
    <article className="stack-group">
      <StackLabel symbol={symbol} title={title} />
      <ul>
        {tools.map((tool) => (
          <TechChip key={tool.name} icon={tool.icon} label={tool.label} />
        ))}
      </ul>
    </article>
  );
}
