# Kokeb Land — Vite + React + TypeScript

Professional, minimal instructions for running and developing the project.

## Requirements

- Node.js 18 or later
- npm (or pnpm / yarn) installed

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be served by Vite (default: http://localhost:5173).

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run build:dev` — build using development mode
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint
- `npm run test` — run tests once (Vitest)
- `npm run test:watch` — run tests in watch mode

## Environment

If the project requires any environment variables, create a `.env` file at the project root and add values there. Do not commit secrets.

## Project Structure (high level)

- `src/` — application source code
- `public/` — static assets
- `package.json` — scripts and dependencies

## Contributing

1. Create a feature branch from `main`.
2. Run `npm install` and `npm run dev` to reproduce the development environment.
3. Add tests for new features where applicable.
4. Run `npm run lint` and `npm run test` before submitting a PR.

## License

This repository does not include a license file. Add one (for example, `MIT`) if you intend to make this project open source.

---
If you want, I can run the test suite or add CI configuration next.
\