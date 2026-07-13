# Parental Legacy & Life Factors Calculator

A single-page React application that generates a deterministic legacy report from a date of birth. It explores how family background, life choices, and key factors shape parental legacy across generations through calculated breakdowns, interactive charts, and local session persistence.

## Overview

This application was built as a multi-phase technical assessment demonstrating modern React engineering practices, clean architecture, and production-ready tooling.

Given a date of birth, the calculator produces a deterministic set of legacy factors — splitting influence between mother and father across seven life dimensions. Results are always recalculated from the input (never stored), ensuring consistency. The UI presents these results through data tables, summary cards, and responsive Recharts visualizations.

The application stores only the entered date and a timestamp in `localStorage`, restoring the previous session on revisit. No backend, database, or network requests are involved.

## Features

- **Deterministic calculations** — Same date of birth always produces identical results
- **Responsive charts** — Grouped bar chart and donut pie chart adapt to all screen sizes
- **Local persistence** — Previous session restored automatically via `localStorage`
- **Accessibility** — Semantic HTML, skip-to-content link, keyboard navigation, reduced motion support, visible focus indicators, screen-reader accessible chart data tables
- **Type-safe architecture** — Strict TypeScript throughout with discriminated types and readonly constants
- **Reusable component system** — Modular UI primitives (`Button`, `Card`, `Badge`, `Container`, `Input`, `StatCard`) composed across the application
- **Mobile-friendly design** — Responsive layout from mobile to desktop using Tailwind CSS utility classes
- **Clean separation of concerns** — Business logic, storage, presentation, and data transformation are isolated into dedicated modules
- **CSV export** — Download calculation results as a standards-compliant CSV file with UTF-8 encoding
- **PDF report export** — Generate a formatted A4 PDF report with summary, factor breakdown, and page numbers

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Type-safe JavaScript with strict mode |
| Tailwind CSS v4 | Utility-first styling via `@tailwindcss/vite` plugin |
| Recharts | Data visualization (bar chart, pie chart) |
| localStorage | Client-side session persistence |
| jsPDF | PDF report generation (dynamically loaded) |
| Vite | Build tool and development server |
| Vercel | Production deployment |

Additional tooling: ESLint 9 (flat config), Prettier, clsx, React Icons.

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd parental-legacy-calculator

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Type-check with TypeScript and produce a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run lint:fix` | Run ESLint with automatic fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check source files for Prettier compliance |

## Project Structure

```
src/
├── components/
│   ├── cards/          # Card and StatCard display components
│   ├── charts/         # Recharts wrappers (bar, pie, tooltip, section)
│   ├── forms/          # Form input components
│   ├── layout/         # Application shell (Header, Footer, Layout)
│   └── ui/             # Reusable UI primitives (Badge, Button, Container, etc.)
├── constants/          # Static configuration (factor ranges, theme colors)
├── hooks/              # Custom React hooks (useCalculator, useLocalStorage, useTheme)
├── pages/              # Route-level page components (Home)
├── services/           # Low-level service modules (storage.service, theme.service)
├── styles/             # Global styles and Tailwind CSS v4 theme configuration
├── types/              # TypeScript type definitions (calculator, storage, theme)
├── utils/              # Pure utility functions (calculator, normalizer, validators, etc.)
├── App.tsx             # Root component — composes Layout and Home
├── main.tsx            # Application entry point — renders App in StrictMode
└── vite-env.d.ts       # Vite client type declarations
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `components/cards/` | Display cards for statistics and data presentation |
| `components/charts/` | Recharts-based chart components with accessibility tables |
| `components/forms/` | Form input components with label, description, and error support |
| `components/layout/` | Application shell — header, footer, skip-link, and main content area |
| `components/ui/` | Reusable UI primitives shared across the application |
| `constants/` | Static configuration data that does not change at runtime (factor ranges, theme colors) |
| `hooks/` | Custom React hooks that encapsulate stateful logic (useCalculator, useLocalStorage, useTheme) |
| `pages/` | Top-level page components orchestrating hooks, components, and data flow |
| `services/` | Low-level service modules for external integrations (localStorage, theme persistence) |
| `styles/` | Global CSS, Tailwind v4 `@theme` configuration, and design tokens |
| `types/` | TypeScript type definitions shared across the codebase (calculator, storage, theme) |
| `utils/` | Pure functions for calculations, data transformation, validation, formatting, and export (CSV, PDF) |

## Architecture

The application follows a single-page architecture where `Home.tsx` orchestrates all state, hooks, and rendering.

```
Home
│
├── useCalculator()
│       │
│       ├── validators.ts    (date validation)
│       ├── date.ts          (date utilities)
│       └── calculator.ts    (legacy calculation engine)
│               │
│               ├── factorRanges.ts   (factor definitions)
│               └── normalizer.ts     (percentage normalization)
│
├── useLocalStorage()
│       │
│       └── storage.service.ts   (localStorage CRUD + validation)
│
├── useTheme()
│       │
│       └── theme.service.ts     (theme persistence + media query)
│
├── Charts
│       │
│       ├── chartData.ts         (data transformation for Recharts)
│       ├── GroupedBarChart      (mother vs. father comparison)
│       ├── ParentSharePieChart  (overall percentage distribution)
│       ├── ChartsSection        (orchestrates chart layout)
│       ├── ChartCard            (wraps charts in Card component)
│       └── ChartTooltip         (custom Recharts tooltip)
│
└── Export
        │
        ├── exportCsv.ts         (CSV file generation)
        └── exportPdf.ts         (PDF report generation via jsPDF)
```

### Separation of Concerns

- **`hooks/`** manages stateful logic and coordinates between pure utilities and the UI
- **`utils/`** contains pure functions with no side effects — easily testable in isolation
- **`services/`** handles external I/O (localStorage) with its own validation layer
- **`components/`** are presentation-focused, receiving data via props and delegating logic to hooks
- **`constants/`** holds static configuration, keeping magic numbers out of business logic
- **`types/`** provides shared type definitions that enforce contracts between modules

This layering means the calculation engine, storage layer, and UI can each evolve independently without cross-cutting dependencies.

## Calculation Algorithm

The calculation is fully deterministic — the same date of birth always produces the same output.

1. **Seed generation** — The day, month, and year are combined using a modular arithmetic formula to produce a seed value between 0 and 999, which is then normalized to a ratio between 0 and 1.

2. **Factor computation** — Each of the seven life factors has a defined minimum and maximum range. The seed ratio maps into each range to produce raw values.

3. **Parent split** — Each factor's total is split between mother and father using a bias derived from the day of birth, with alternating dominance.

4. **Normalization** — All factor values are normalized so that the combined mother and father totals sum to exactly 100%, ensuring consistent proportions across all calculations.

No random number generators, external APIs, or time-dependent values are involved.

## Accessibility

- **Semantic HTML** — Proper heading hierarchy, `<section>` landmarks with `aria-labelledby`, `<table>` with `<caption>`, and `<th scope>` attributes
- **Skip-to-content link** — Hidden by default, visible on keyboard focus, jumps directly to main content
- **Keyboard navigation** — All interactive elements (date input, buttons) are fully keyboard accessible with visible `:focus-visible` outlines
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables animations for users who prefer it
- **Screen-reader chart data** — Both the grouped bar chart and summary sections include `sr-only` data tables that provide the same information as the visual charts
- **ARIA usage** — Applied only where necessary (`aria-labelledby` for sections, `aria-live="polite"` for dynamic summary updates, `aria-hidden="true"` for decorative icons)

## Performance

- **Deterministic calculations** — Pure functions that run synchronously with no network overhead
- **Efficient render flow** — Custom hooks (`useCalculator`, `useLocalStorage`) isolate state updates, minimizing unnecessary re-renders
- **Responsive charts** — Recharts `ResponsiveContainer` adapts chart dimensions to the viewport without JavaScript resize listeners
- **Lightweight persistence** — localStorage reads and writes are minimal, synchronous, and wrapped in try/catch for graceful degradation
- **No runtime overhead** — No analytics, tracking scripts, or external network requests

## Assumptions

- The user enters a single date of birth (no multiple profiles)
- The date input is sufficient to generate all legacy factors (no additional personal data required)
- Calculations are deterministic and do not need external randomness or APIs
- `localStorage` is available and sufficient for session persistence
- The application runs entirely client-side with no backend or database
- A single-user, single-session model is acceptable

## Future Improvements

- **PDF export** — Generate a downloadable report from the results
- **Multiple profiles** — Save and compare legacy reports for different dates of birth
- **Backend synchronization** — Store profiles in a database for cross-device access
- **Authentication** — User accounts to protect and manage saved profiles
- **Dark mode** — Toggle between light and dark themes (architecture already prepared via CSS custom properties)
- **Internationalization** — Support multiple languages and locale-specific formatting
- **Unit tests** — Jest or Vitest coverage for calculator, normalizer, validators, and storage service
- **E2E tests** — Playwright or Cypress tests for full user workflows

## Deployment

### Prerequisites

- Node.js 18 or later
- npm

### Build for Production

```bash
npm run build
```

This produces a `dist/` directory with optimized static assets.

### Deploy to Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects the Vite framework — no configuration needed
4. Confirm the settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

Vercel will build and deploy the application. Subsequent pushes to the main branch will trigger automatic redeployments.

## License

Private
