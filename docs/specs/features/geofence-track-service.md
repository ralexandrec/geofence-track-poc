# Feature Specification: Geofence Tracking Service

## Overview
This service receives device location events and evaluates whether a device is inside a restricted geofence. The system records position events, returns alert state, and supports typical CRUD operations for tracked position objects.

## Scope
- Accept position input from devices.
- Validate payload shape and semantic constraints.
- Calculate geofence alert status using a fixed restricted zone.
- Store positions in memory for the prototype.
- Support query and update operations for stored positions.

## Key Use Cases

### 1. Register Device Position
- Input: `deviceId`, `latitude`, `longitude`, `timestamp`
- Processing:
  - Validate request body.
  - Convert timestamp to `Date`.
  - Calculate distance to restricted zone center using the Haversine formula.
  - Mark `alert = true` when the device is within 500 meters of the restricted zone.
  - Persist the position in the in-memory collection.
- Output: persisted record plus alert status and a human-readable message.

### 2. Retrieve All Positions
- Return a list of all recorded track entries.
- Each entry includes `id`, `deviceId`, `latitude`, `longitude`, `timestamp`, and `alert`.

### 3. Retrieve Position by ID
- Lookup a position record by numeric ID.
- Return `null` if the record does not exist.

### 4. Update Position
- Accept partial updates for `deviceId`, `latitude`, `longitude`, and/or `timestamp`.
- Recalculate geofence alert status after any location change.
- Return the updated record.

### 5. Remove Position
- Delete a stored position by ID.
- Return the deleted object or `null` if not found.

## Validation Rules
- `deviceId`: required, non-empty string
- `latitude`: required, valid latitude number
- `longitude`: required, valid longitude number
- `timestamp`: required, valid ISO 8601 string

## Current Implementation Notes
- The restricted geofence center is currently hardcoded as latitude `-23.55052`, longitude `-46.633308` with radius `500` meters.
- The system uses `TrackService` to manage persisted state and `GeofenceService` to evaluate alert conditions.
- The prototype stores events in-memory using a simple auto-incrementing `id`.
