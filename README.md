<p align="center">
  <img src="docs/renatosoft-logo.png" alt="RenatoSoft Company Ltda logo" width="360" />
</p>

# RenatoSoft Geofence Track POC

A public NestJS tracking API prototype built to showcase clean architecture, AI-informed SDD alignment, and real-time geofence alerting.

## About this project

This repository implements a lightweight tracking API service with:

- **NestJS architecture** for modular, testable server-side code.
- **Geofence alert detection** using a fixed restricted zone.
- **In-memory persistence** for a fast prototype workflow.
- **API documentation and SDD-driven design** stored under `docs/`.
- **End-to-end, controller, and service tests** validating the contract.

The project is designed for contractors and reviewers who want to inspect a production-minded Node.js service with clear documentation and deployable docs.

## What it includes

- `src/track/track.controller.ts` — REST endpoints for track CRUD operations.
- `src/track/track.service.ts` — business rules, in-memory storage, update/delete logic.
- `src/track/geofence.service.ts` — alert evaluation for restricted zone membership.
- `docs/index.html` — documentation entry point generated for the project.
- `docs/specs/features/geofence-track-service.md` — feature specification and SDD.
- `test/app.e2e-spec.ts` — API-level validation of `/track` routes.
- `src/**/*.spec.ts` — unit coverage for controller and service behavior.

## Quick start

```bash
npm install
```

## Run locally

```bash
npm run start:dev
```

Open http://localhost:3000 in your browser to access the API once the server is running.

## Testing

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Accessing the documentation

The project documentation is available from the generated docs site in `docs/index.html`.

### View locally

Use a simple static server to preview the docs:

```bash
npx serve docs
```

Then open:

- http://localhost:3000 (or the port reported by the server)

### Deploy the docs on GitHub Pages

Because the documentation lives in `docs/`, this repository is ready for GitHub Pages using the `docs` folder as the site source.

1. In GitHub repo settings, set Pages source to `Deploy from a branch` and folder `docs`.
2. Push your branch to GitHub.
3. GitHub will publish the docs from `docs/index.html`.

> The `docs/index.html` file is the published entry point for the documentation website.

## Deployment

### Deploy the API service

Build and start the app for production:

```bash
npm run build
npm run start:prod
```

### Recommended deployment flow

This is a prototype service suitable for cloud deployment on platforms that support Node.js. A common sequence is:

1. Install dependencies with `npm install`.
2. Run `npm run build`.
3. Start the server with `npm run start:prod`.

## Purpose and audience

This repository is intended for contractors and reviewers evaluating:

- code organization and NestJS module design,
- API contract consistency with documentation,
- test coverage for service and controller behavior,
- documentation deployment via `docs/`, and
- AI-assisted SDD adherence in a real service prototype.

## Notes for reviewers

- The service is intentionally simple and prototype-focused.
- All state is stored in memory, which keeps the implementation easy to inspect.
- The geofence alert is evaluated against a fixed radius around a hardcoded center.
- The `docs/` folder is the canonical documentation deployment path.

---

### RenatoSoft Company Ltda

A concise, modern PoC project for demonstrating NestJS capabilities with strong documentation and deployable design.  
