import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/track (POST) should create a track and return alert message', async () => {
    const payload = {
      deviceId: 'vehicle-1',
      latitude: -23.55052,
      longitude: -46.633308,
      timestamp: '2026-05-28T12:00:00Z',
    };

    const response = await request(app.getHttpServer())
      .post('/track')
      .send(payload)
      .expect(201);

    expect(response.body).toMatchObject({
      deviceId: payload.deviceId,
      alert: true,
      message: 'Geofence alert triggered',
    });
    expect(response.body).toHaveProperty('id');
  });

  it('/track (GET) should return all tracks', async () => {
    const payload = {
      deviceId: 'vehicle-2',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T12:30:00Z',
    };

    await request(app.getHttpServer()).post('/track').send(payload).expect(201);

    const response = await request(app.getHttpServer()).get('/track').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      deviceId: payload.deviceId,
      alert: false,
    });
  });

  it('/track/:id (GET) should return a single track by id', async () => {
    const payload = {
      deviceId: 'vehicle-3',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T13:00:00Z',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/track')
      .send(payload)
      .expect(201);

    const id = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/track/${id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id,
      deviceId: payload.deviceId,
      alert: false,
    });
  });

  it('/track/:id (PATCH) should update a track and recalculate alert', async () => {
    const createPayload = {
      deviceId: 'vehicle-4',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T13:30:00Z',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/track')
      .send(createPayload)
      .expect(201);

    const id = createResponse.body.id;
    const updatePayload = {
      latitude: -23.55052,
      longitude: -46.633308,
    };

    const response = await request(app.getHttpServer())
      .patch(`/track/${id}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toMatchObject({
      id,
      alert: true,
      latitude: updatePayload.latitude,
      longitude: updatePayload.longitude,
    });
  });

  it('/track/:id (DELETE) should remove a track and return it', async () => {
    const payload = {
      deviceId: 'vehicle-5',
      latitude: -23.54052,
      longitude: -46.623308,
      timestamp: '2026-05-28T14:00:00Z',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/track')
      .send(payload)
      .expect(201);

    const id = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/track/${id}`)
      .expect(200);

    expect(deleteResponse.body).toMatchObject({
      id,
      deviceId: payload.deviceId,
    });

    const getResponse = await request(app.getHttpServer())
      .get(`/track/${id}`)
      .expect(200);

    expect(getResponse.body).toBeNull();
  });

  afterEach(async () => {
    await app.close();
  });
});
