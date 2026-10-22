import { stacks, techIcons } from '../data/portfolio.js';
import SectionLabel from '../components/SectionLabel.jsx';
import StackGroup from '../components/StackGroup.jsx';

export default function TechStackSection() {
  return (
    <section
      id="stack"
      className="stack section wrap"
      aria-labelledby="stack-title"
    >
      <SectionLabel>02 / TOOLKIT</SectionLabel>
      <div className="section-heading">
        <h2 id="stack-title">
          My tech <span>stack.</span>
        </h2>
        <p>
          The tools I work with,
          <br />
          from the browser to the cloud.
        </p>
      </div>
      <div className="stack-grid">
        {stacks.map((stack) => (
          <StackGroup
            key={stack.title}
            title={stack.title}
            symbol={stack.symbol}
            tools={stack.tools.map((tool) => ({
              name: tool,
              icon: techIcons[tool],
              label: tool === 'MCP' ? 'Model Context Protocol (MCP)' : tool,
            }))}
          />
        ))}
      </div>
    </section>
  );
}
