# ADR 002: Separate Geofence Logic Into a Dedicated Service

## Status
Accepted

## Context
The current system needs to evaluate whether incoming device positions fall inside a restricted geographic zone. The calculation should be isolated from request handling and storage to keep the domain logic reusable and testable.

## Decision
Implement geofence computation in a dedicated `GeofenceService`, keeping `TrackService` responsible for lifecycle operations and data storage.

## Rationale
- Separating geofence rules from persistence and API concerns improves maintainability.
- It allows the geofence logic to be reused by different consumers or future workflows, such as event-driven alerts or batch evaluation.
- The service encapsulates the Haversine distance algorithm, making its behavior explicit and easy to validate.

## Consequences
- The `TrackService` can focus on CRUD behavior and state management.
- The geofence boundary configuration is centralized in one place for easy tuning.
- Future enhancements may replace the in-memory store with a database without affecting the geofence rule implementation.
