import { Test, TestingModule } from '@nestjs/testing';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

describe('TrackController', () => {
  let controller: TrackController;
  let service: jest.Mocked<TrackService>;

  const mockTrackService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as unknown as jest.Mocked<TrackService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [
        {
          provide: TrackService,
          useValue: mockTrackService,
        },
      ],
    }).compile();

    controller = module.get<TrackController>(TrackController);
    service = module.get<TrackService>(TrackService) as jest.Mocked<TrackService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call trackService.create and return created track', () => {
      const payload = {
        deviceId: 'vehicle-1',
        latitude: -23.55,
        longitude: -46.63,
        timestamp: '2026-06-04T12:00:00Z',
      };
      const expectedResult = {
        id: 1,
        deviceId: payload.deviceId,
        latitude: payload.latitude,
        longitude: payload.longitude,
        timestamp: new Date(payload.timestamp),
        alert: true,
        message: 'Geofence alert triggered',
      };

      service.create.mockReturnValue(expectedResult);

      expect(controller.create(payload)).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('findAll', () => {
    it('should call trackService.findAll and return all tracks', () => {
      const expectedResult = [
        {
          id: 1,
          deviceId: 'vehicle-1',
          latitude: -23.55,
          longitude: -46.63,
          timestamp: new Date('2026-06-04T12:00:00Z'),
          alert: true,
          message: 'Geofence alert triggered',
        },
      ];

      service.findAll.mockReturnValue(expectedResult);

      expect(controller.findAll()).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call trackService.findOne with a numeric id and return the track', () => {
      const expectedResult = {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.55,
        longitude: -46.63,
        timestamp: new Date('2026-06-04T12:00:00Z'),
        alert: true,
        message: 'Geofence alert triggered',
      };

      service.findOne.mockReturnValue(expectedResult);

      expect(controller.findOne('1')).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null when trackService.findOne returns null', () => {
      service.findOne.mockReturnValue(null);

      expect(controller.findOne('999')).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should call trackService.update with a numeric id and payload', () => {
      const payload = {
        latitude: -23.54,
        longitude: -46.62,
      };
      const expectedResult = {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: payload.latitude,
        longitude: payload.longitude,
        timestamp: new Date('2026-06-04T12:00:00Z'),
        alert: false,
        message: 'Position stored successfully',
      };

      service.update.mockReturnValue(expectedResult);

      expect(controller.update('1', payload)).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, payload);
    });

    it('should return null when trackService.update returns null', () => {
      const payload = {
        latitude: -23.54,
      };
      service.update.mockReturnValue(null);

      expect(controller.update('999', payload)).toBeNull();
      expect(service.update).toHaveBeenCalledWith(999, payload);
    });
  });

  describe('remove', () => {
    it('should call trackService.remove with a numeric id and return the removed track', () => {
      const expectedResult = {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.55,
        longitude: -46.63,
        timestamp: new Date('2026-06-04T12:00:00Z'),
        alert: true,
        message: 'Geofence alert triggered',
      };

      service.remove.mockReturnValue(expectedResult);

      expect(controller.remove('1')).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should return null when trackService.remove returns null', () => {
      service.remove.mockReturnValue(null);

      expect(controller.remove('999')).toBeNull();
      expect(service.remove).toHaveBeenCalledWith(999);
    });
  });
});
