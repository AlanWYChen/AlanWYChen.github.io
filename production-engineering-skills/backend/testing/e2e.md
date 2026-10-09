# Backend End-to-End Testing

Use sparingly for critical system workflows spanning multiple components.

Examples:
- authenticate → create resource → retrieve resource
- enqueue job → worker processes → state becomes complete
- payment webhook → entitlement update
- event publish → downstream consumer side effect

Avoid using E2E as the only coverage layer.
