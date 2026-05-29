import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { GeofenceService } from './geofence.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, GeofenceService],
})
export class TrackModule {}
