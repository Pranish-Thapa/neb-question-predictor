import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AppProvider } from '../store/AppProvider';

const ROUTES = [
  '/',
  '/predictor',
  '/paper',
  '/exam',
  '/analysis',
  '/syllabus',
  '/research',
  '/settings',
];

function renderRoute(route: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[route]}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>,
  );
}

describe('every page renders without crashing', () => {
  for (const route of ROUTES) {
    it(`renders ${route}`, () => {
      const html = renderRoute(route);
      expect(html.length).toBeGreaterThan(400);
      expect(html).toContain('NEB Class 12');
      expect(html.includes('undefined')).toBe(false);
      expect(html.includes('[object Object]')).toBe(false);
    });
  }

  it('shows the honest terminal-evidence notice on the dashboard', () => {
    const html = renderRoute('/');
    expect(html).toContain('Terminal-paper evidence');
    expect(html).toContain('Insufficient verified data');
  });

  it('lists the research log sources and integrity checks', () => {
    const html = renderRoute('/research');
    expect(html).toContain('Source registry');
    expect(html).toContain('All checks pass');
  });
});
