import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReserveController } from './reserve.controller';
import * as request from 'supertest';
import { AddReserveState } from './model/reserve.interface';
import { AppModule } from '../../app.module';

describe('ReserveController', () => {
  let controller: ReserveController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<ReserveController>(ReserveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/Create reserve (POST)', () => {
    const dto: AddReserveState = {
      name: 'somsak kong',
      phone: '0812345678',
      date: '2022-10-21T09:00:00.000Z',
      numberCustomers: 8,
    };

    return request(app.getHttpServer())
      .post('/reserve')
      .send(dto)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Reserve was created',
          data: expect.any(Array),
        });
      });
  });

  it('/Cancel reserve booking (GET)', () => {
    return request(app.getHttpServer())
      .delete('/reserve/cancel/c4c3dac7-c7b1-433d-8055-745dca8f595f')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Reserve was canceled',
        });
      });
  });
});
