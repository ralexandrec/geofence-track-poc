import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { GeofenceService } from './geofence.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
  private nextId = 1;

  constructor(private readonly geofenceService: GeofenceService) {}

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: this.nextId++,
      deviceId: createTrackDto.deviceId,
      latitude: createTrackDto.latitude,
      longitude: createTrackDto.longitude,
      timestamp: new Date(createTrackDto.timestamp),
      alert: false,
    };

    track.alert = this.geofenceService.checkAlert(track);
    this.tracks.push(track);

    return {
      ...track,
      message: track.alert ? 'Geofence alert triggered' : 'Position stored successfully',
    };
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: number) {
    return this.tracks.find((track) => track.id === id) ?? null;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    if (!track) {
      return null;
    }

    track.deviceId = updateTrackDto.deviceId ?? track.deviceId;
    track.latitude = updateTrackDto.latitude ?? track.latitude;
    track.longitude = updateTrackDto.longitude ?? track.longitude;
    track.timestamp = updateTrackDto.timestamp
      ? new Date(updateTrackDto.timestamp)
      : track.timestamp;
    track.alert = this.geofenceService.checkAlert(track);

    return track;
  }

  remove(id: number) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return null;
    }

    const [removed] = this.tracks.splice(index, 1);
    return removed;
  }
}
