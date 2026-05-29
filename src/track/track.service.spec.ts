import { Test, TestingModule } from '@nestjs/testing';
import { CreateTrackDto } from './dto/create-track.dto';
import { GeofenceService } from './geofence.service';
import { TrackService } from './track.service';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackService, GeofenceService],
    }).compile();

    service = module.get<TrackService>(TrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a track and trigger a geofence alert when inside restricted zone', () => {
    const payload: CreateTrackDto = {
      deviceId: 'vehicle-1',
      latitude: -23.55052,
      longitude: -46.633308,
      timestamp: '2026-05-28T12:00:00Z',
    };

    const result = service.create(payload);

    expect(result).toMatchObject({
      id: 1,
      deviceId: 'vehicle-1',
      alert: true,
      message: 'Geofence alert triggered',
    });
  });

  it('should create a track without alert when outside restricted zone', () => {
    const payload: CreateTrackDto = {
      deviceId: 'vehicle-2',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T12:30:00Z',
    };

    const result = service.create(payload);

    expect(result.alert).toBe(false);
    expect(result.message).toBe('Position stored successfully');
  });

  it('should update a track and recalculate the alert state', () => {
    const created = service.create({
      deviceId: 'vehicle-3',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T13:00:00Z',
    });

    const updated = service.update(created.id, {
      latitude: -23.55052,
      longitude: -46.633308,
    });

    expect(updated).not.toBeNull();
    expect(updated?.alert).toBe(true);
  });
});
