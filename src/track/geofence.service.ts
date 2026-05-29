import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';

@Injectable()
export class GeofenceService {
  private readonly restrictedZone = {
    latitude: -23.55052,
    longitude: -46.633308,
    radiusMeters: 500,
  };

  checkAlert(track: Omit<Track, 'id' | 'alert'>): boolean {
    const distance = this.distanceInMeters(
      track.latitude,
      track.longitude,
      this.restrictedZone.latitude,
      this.restrictedZone.longitude,
    );

    return distance <= this.restrictedZone.radiusMeters;
  }

  private distanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371000; // metros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  private toRadians(value: number): number {
    return (value * Math.PI) / 180;
  }
}
