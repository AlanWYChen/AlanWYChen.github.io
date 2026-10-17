import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { linkedin, stacks } from './data/portfolio.js';

export function render() {
  return {
    markup: renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://alanwychen.github.io/#profile',
      url: 'https://alanwychen.github.io/',
      name: 'Alan Chen — Software Engineer',
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://alanwychen.github.io/#person',
        name: 'Alan Chen',
        url: 'https://alanwychen.github.io/',
        jobTitle: 'Software Engineer',
        sameAs: [linkedin, 'https://github.com/AlanWYChen'],
        knowsAbout: stacks.flatMap((stack) => stack.tools),
      },
    },
  };
}
