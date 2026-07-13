# Parental Legacy Calculator

A modern web application that explores how family background, life choices, and key factors shape parental legacy across generations.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 6 | Build tool & dev server |
| TypeScript 5 | Type-safe JavaScript |
| Tailwind CSS 4 | Utility-first styling |
| React Hook Form | Form management |
| Recharts | Data visualization |
| React Icons | Icon library |
| clsx | Conditional classNames |
| ESLint 9 | Code linting (flat config) |
| Prettier | Code formatting |

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

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Folder Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   ├── layout/          # Layout shell components (Header, Footer, Layout)
│   └── ui/              # Reusable UI primitives (Container)
├── pages/               # Route-level page components
├── styles/              # Global styles and Tailwind CSS configuration
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type declarations
```

## Development Workflow

1. Run `npm run dev` to start the Vite dev server
2. Edit files in `src/` — the app hot-reloads automatically
3. Run `npm run lint` before committing to catch issues
4. Run `npm run format` to ensure consistent code style
5. Run `npm run build` to verify the production build succeeds

## Configuration

- **TypeScript** — Strict mode enabled with path aliases (`@/` maps to `src/`)
- **ESLint** — Flat config with TypeScript, React Hooks, and Prettier integration
- **Prettier** — Consistent formatting with trailing commas, double quotes, 80-char width
- **Tailwind CSS** — Configured via CSS-first `@theme` directive (v4)
- **Vite** — React plugin, Tailwind CSS plugin, and `@` path alias

## License

Private
