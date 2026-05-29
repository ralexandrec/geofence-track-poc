# Setup and Development Guide

## Prerequisites
- Node.js installed (recommended `>=18.19.1` or newer for compatibility with current dependencies)
- npm available in the terminal

## Install dependencies

```bash
cd tracking-app
npm install
```

## Run the application locally

```bash
npm run start:dev
```

The service will start on `http://localhost:3000`.

## API endpoints
- `POST /track` — register a new device position and evaluate geofence alert
- `GET /track` — list all tracked positions
- `GET /track/{id}` — get a single position by ID
- `PATCH /track/{id}` — update a position record and recalculate alert state
- `DELETE /track/{id}` — remove a position

## Run tests

```bash
npm test
```

For the track service unit test:

```bash
npm test -- src/track/track.service.spec.ts --runInBand
```

## Notes
- The current prototype uses an in-memory store for positions.
- Geofence logic is isolated in `src/track/geofence.service.ts` to enable reuse and future extraction into an event or stream processing component.
- The system uses `ValidationPipe` to enforce DTO contract validation during request handling.
