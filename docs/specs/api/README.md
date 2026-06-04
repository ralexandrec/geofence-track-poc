# API Documentation Guide

This folder contains the API contract for the Geo Tracking service.

## Files

- `openapi.yaml` — OpenAPI 3.0 contract for the service endpoints.

## Purpose

This README explains how to review and use the API contract:

- Use the OpenAPI file to generate client SDKs.
- Share the contract with backend and frontend teams.
- Validate implementation against the expected request and response models.

## Notes

- `POST /track` requires a `CreateTrackDto` payload.
- `PATCH /track/{id}` accepts a partial `UpdateTrackDto`.
- Responses include the computed geofence `alert` state.
