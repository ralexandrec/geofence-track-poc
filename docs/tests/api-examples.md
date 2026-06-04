# API Testing Examples

This document provides comprehensive examples for testing the Tracking App API using `curl` commands. Each example demonstrates a specific use case and explains what happens at each step.

## Table of Contents

1. [Create a Track (In Geofence Zone)](#create-a-track-in-geofence-zone)
2. [Create a Track (Outside Geofence Zone)](#create-a-track-outside-geofence-zone)
3. [List All Tracks](#list-all-tracks)
4. [Get a Single Track](#get-a-single-track)
5. [Update a Track (Trigger Alert)](#update-a-track-trigger-alert)
6. [Update a Track (Clear Alert)](#update-a-track-clear-alert)
7. [Delete a Track](#delete-a-track)
8. [Error Handling Examples](#error-handling-examples)

---

## Create a Track (In Geofence Zone)

This example creates a device position inside the restricted geofence zone (São Paulo downtown area, -23.55052, -46.633308 with 500m radius).

```bash
curl -X POST http://localhost:3000/track \
  -H 'Content-Type: application/json' \
  -d '{
    "deviceId": "vehicle-101",
    "latitude": -23.55052,
    "longitude": -46.633308,
    "timestamp": "2026-05-28T14:30:00Z"
  }'
```

**Response:**
```json
{
  "id": 1,
  "deviceId": "vehicle-101",
  "latitude": -23.55052,
  "longitude": -46.633308,
  "timestamp": "2026-05-28T14:30:00.000Z",
  "alert": true,
  "message": "Geofence alert triggered"
}
```

**What happens:**
- The API receives the position coordinates
- The `GeofenceService` calculates the distance from the restricted zone center using the Haversine formula
- Since the distance is ≤ 500 meters, `alert` is set to `true`
- The response includes a message indicating the geofence alert

---

## Create a Track (Outside Geofence Zone)

This example creates a device position outside the restricted geofence zone.

```bash
curl -X POST http://localhost:3000/track \
  -H 'Content-Type: application/json' \
  -d '{
    "deviceId": "vehicle-102",
    "latitude": -23.54000,
    "longitude": -46.62000,
    "timestamp": "2026-05-28T14:35:00Z"
  }'
```

**Response:**
```json
{
  "id": 2,
  "deviceId": "vehicle-102",
  "latitude": -23.54,
  "longitude": -46.62,
  "timestamp": "2026-05-28T14:35:00.000Z",
  "alert": false,
  "message": "Position stored successfully"
}
```

**What happens:**
- The position is far from the restricted zone center (more than 500 meters away)
- `alert` is set to `false`
- The response indicates normal storage without alert

---

## List All Tracks

This example retrieves all stored track positions in the system.

```bash
curl -X GET http://localhost:3000/track
```

**Response:**
```json
[
  {
    "id": 1,
    "deviceId": "vehicle-101",
    "latitude": -23.55052,
    "longitude": -46.633308,
    "timestamp": "2026-05-28T14:30:00.000Z",
    "alert": true
  },
  {
    "id": 2,
    "deviceId": "vehicle-102",
    "latitude": -23.54,
    "longitude": -46.62,
    "timestamp": "2026-05-28T14:35:00.000Z",
    "alert": false
  }
]
```

**What happens:**
- Returns an array of all track records
- Each record includes all position data and alert status
- Useful for dashboards or batch queries

---

## Get a Single Track

This example retrieves a specific track by its ID.

```bash
curl -X GET http://localhost:3000/track/1
```

**Response:**
```json
{
  "id": 1,
  "deviceId": "vehicle-101",
  "latitude": -23.55052,
  "longitude": -46.633308,
  "timestamp": "2026-05-28T14:30:00.000Z",
  "alert": true
}
```

**What happens:**
- The API looks up the track record by ID
- If found, returns the complete record
- If not found, returns `null`

---

## Update a Track (Trigger Alert)

This example updates an existing track's location to trigger a geofence alert.

```bash
curl -X PATCH http://localhost:3000/track/2 \
  -H 'Content-Type: application/json' \
  -d '{
    "latitude": -23.55052,
    "longitude": -46.633308,
    "timestamp": "2026-05-28T14:40:00Z"
  }'
```

**Response:**
```json
{
  "id": 2,
  "deviceId": "vehicle-102",
  "latitude": -23.55052,
  "longitude": -46.633308,
  "timestamp": "2026-05-28T14:40:00.000Z",
  "alert": true
}
```

**What happens:**
- The vehicle moves into the restricted geofence zone
- The system recalculates the distance and detects the alert condition
- `alert` changes from `false` to `true`
- Simulates a real-world scenario where a vehicle enters a restricted area

---

## Update a Track (Clear Alert)

This example updates a track to move it outside the geofence zone, clearing the alert.

```bash
curl -X PATCH http://localhost:3000/track/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "latitude": -23.54000,
    "longitude": -46.62000,
    "timestamp": "2026-05-28T14:45:00Z"
  }'
```

**Response:**
```json
{
  "id": 1,
  "deviceId": "vehicle-101",
  "latitude": -23.54,
  "longitude": -46.62,
  "timestamp": "2026-05-28T14:45:00.000Z",
  "alert": false
}
```

**What happens:**
- The vehicle exits the restricted zone
- The alert status is recalculated and set to `false`
- Simulates a vehicle leaving a monitored area

---

## Delete a Track

This example removes a track record from the system.

```bash
curl -X DELETE http://localhost:3000/track/1
```

**Response:**
```json
{
  "id": 1,
  "deviceId": "vehicle-101",
  "latitude": -23.54,
  "longitude": -46.62,
  "timestamp": "2026-05-28T14:45:00.000Z",
  "alert": false
}
```

**What happens:**
- The track is removed from the in-memory store
- The response returns the deleted record (for confirmation)
- If the ID does not exist, returns `null`

---

## Error Handling Examples

### Invalid Latitude

```bash
curl -X POST http://localhost:3000/track \
  -H 'Content-Type: application/json' \
  -d '{
    "deviceId": "vehicle-103",
    "latitude": -95.0,
    "longitude": -46.633308,
    "timestamp": "2026-05-28T15:00:00Z"
  }'
```

**Response (400 Bad Request):**
```json
{
  "message": [
    "latitude must be a latitude string or number"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Missing Required Field

```bash
curl -X POST http://localhost:3000/track \
  -H 'Content-Type: application/json' \
  -d '{
    "deviceId": "vehicle-104",
    "latitude": -23.55052
  }'
```

**Response (400 Bad Request):**
```json
{
  "message": [
    "longitude must be a longitude string or number",
    "timestamp should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Invalid Timestamp Format

```bash
curl -X POST http://localhost:3000/track \
  -H 'Content-Type: application/json' \
  -d '{
    "deviceId": "vehicle-105",
    "latitude": -23.55052,
    "longitude": -46.633308,
    "timestamp": "2026-05-28 15:00:00"
  }'
```

**Response (400 Bad Request):**
```json
{
  "message": [
    "timestamp must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## Testing Workflow

For a complete testing experience, follow this sequence:

1. **Create two vehicles outside the zone:**
   ```bash
   curl -X POST http://localhost:3000/track -H 'Content-Type: application/json' \
     -d '{"deviceId":"truck-1","latitude":-23.54,"longitude":-46.62,"timestamp":"2026-05-28T16:00:00Z"}'
   ```

2. **Move one vehicle into the geofence:**
   ```bash
   curl -X PATCH http://localhost:3000/track/1 -H 'Content-Type: application/json' \
     -d '{"latitude":-23.55052,"longitude":-46.633308,"timestamp":"2026-05-28T16:05:00Z"}'
   ```

3. **List all tracks to verify alert status:**
   ```bash
   curl -X GET http://localhost:3000/track
   ```

4. **Move the vehicle back out:**
   ```bash
   curl -X PATCH http://localhost:3000/track/1 -H 'Content-Type: application/json' \
     -d '{"latitude":-23.54,"longitude":-46.62,"timestamp":"2026-05-28T16:10:00Z"}'
   ```

5. **Clean up:**
   ```bash
   curl -X DELETE http://localhost:3000/track/1
   ```

This demonstrates the full lifecycle of a vehicle entering and exiting a monitored geofence zone.
