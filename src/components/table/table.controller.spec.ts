import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('TableController', () => {
  let controller: TableController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<TableController>(TableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/Fetch all table booking (GET)', () => {
    return request(app.getHttpServer())
      .get('/table')
      .query({
        pagesize: '10',
        page: '1',
        message: 'undefined',
        sort: 'undefined',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          tables: expect.any(Array),
          count: expect.any(Number),
        });
      });
  });
});
