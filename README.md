# Burger Restaurants Web

A React single page application for browsing nearby burger restaurants, viewing details and reading reviews.

## Features

- **Nearby restaurants list** — fetches restaurants based on the user's location
- **Interactive map** — React Leaflet map pins with popup details for each restaurant; gracefully degrades with an error boundary if the map fails to load
- **Restaurant details** — name, address, overall rating and a full description with expand/collapse (ReadMore)
- **Reviews** — infinity loaded list with per category rating breakdown (taste, texture, visual, general)
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation and automated axe-core checks in E2E tests
- **Offline capable mocking** — MSW service worker intercepts API calls in both the browser and tests

## Architecture

The source tree follows a **feature based structure** to keep each concern isolated, making it straightforward to add new features, extend existing ones and test each piece independently.

- `src/features/` — each feature owns its components and business logic and can be developed in isolation
- `src/shared/` — reusable UI components shared across features (map widget, notices, modals, rating display, ui/ etc.)
- `src/api/` — Axios instance, typed endpoints and TanStack Query hooks
- `src/pages/` — route level entry points that compose page with features
- `src/routes/` — react router route definitions

## Roadmap

Project is intentionally scoped to demonstrate core frontend architecture. Planned next steps:

- **List virtualisation** — virtual rendering for the infinite scroll restaurants and reviews lists to keep DOM node count low and scroll performance smooth at scale
- **API response validation** — add Zod schema and validation
- **Authentication** — features login/register flow (AWS Amplify or similar)
- **Shared UI library** — reusable `Button`, `Field`, `RatingStarField`, `Dialog` components and form field wrappers with error/warning display, each with unit tests and Storybook stories
- **Post a review** — protected route requiring login, with photo upload (size/type validation)
- **Lighthouse CI** — automated performance, accessibility and SEO audits on every PR with score thresholds enforced in the pipeline
- **Bundle size analysis** — PR vs master comparison using `size-limit` and `compressed-size-action`, posting a diff comment on each PR to catch unexpected size regressions
- **Additional improvements** — discovered during development and added incrementally

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router v7** — client side routing
- **TanStack Query** — data fetching and caching
- **React Leaflet** — open source interactive map
- **MSW** — service worker API mocking for realistic experience and test isolation
- **SCSS** — styling

## Testing

- **Vitest** + **React Testing Library** — unit and integration tests
- **Playwright** — end-to-end tests
- **axe-core** — automated accessibility checks in E2E tests

## Code Quality

- **ESLint** with plugins: `react`, `react-hooks`, `jsx-a11y`, `sonarjs`, `security`, `tanstack-query`, `testing-library`, `simple-import-sort`
- **Prettier** — code formatting
- **Husky** + **lint-staged** — pre-commit hook runs ESLint and Prettier on staged files
- **Autoprefixer** — automatic vendor prefixes via PostCSS

## CI

GitHub Actions runs on every push and pull request to `master`:

1. Lint, format check and typecheck
2. Unit and integration tests with coverage
3. Production build
4. E2E tests (Chromium)

## Prerequisites

- **Node.js 20+**
- **npm 10+**

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command                 | Description                     |
| ----------------------- | ------------------------------- |
| `npm run dev`           | Start development server        |
| `npm run build`         | Production build                |
| `npm run lint`          | Run ESLint                      |
| `npm run typecheck`     | TypeScript type check           |
| `npm run format`        | Format with Prettier            |
| `npm test`              | Unit tests (watch mode)         |
| `npm run test:run`      | Unit tests (single run)         |
| `npm run test:coverage` | Unit tests with coverage report |
| `npm run e2e`           | End-to-end tests                |
