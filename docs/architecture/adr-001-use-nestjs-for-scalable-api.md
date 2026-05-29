# ADR 001: Use NestJS for Scalable API and Modular Architecture

## Status
Accepted

## Context
The project is a prototype service for geofencing and device tracking. It must demonstrate a maintainable server-side architecture, separation of concerns, dependency injection, and ease of extension for future microservice components.

## Decision
Use NestJS as the framework for the service.

## Rationale
- NestJS provides a structured module system that supports a clean separation between controllers, services, and domain logic.
- Built-in support for dependency injection increases testability and enables explicit service boundaries.
- NestJS integrates well with TypeScript and encourages standard patterns used by modern engineering teams.
- The framework supports middleware, validation pipes, and future adoption of microservice transport layers.

## Consequences
- The application is organized into feature modules (`TrackModule`), making it easier to evolve into a microservice architecture.
- The existing behavior is testable with `@nestjs/testing` and can be extended with additional providers or transports.
- Developers can rely on NestJS conventions for request handling and validation.
