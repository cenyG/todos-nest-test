import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';

const mockData = [
  {
    id: 1,
    name: 'Bob',
    title: 'do work 1',
    description: 'hard work',
  },
  {
    id: 2,
    name: 'Stefany',
    title: 'do work 2',
    description: 'hard work 2',
  },
  {
    id: 3,
    name: 'John',
    title: 'do work 2',
    description: 'hard work 2',
  },
];

describe('TODO API tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await Promise.all(
      mockData.map(
        async (data) =>
          await request(app.getHttpServer()).post('/todos').send(data),
      ),
    );
  });

  afterEach(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      await repository.clear();
    }
  });

  it('/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect(mockData);
  });

  it('/todos?page=1&limit=1 (GET)', () => {
    const expected = {
      data: mockData.slice(0, 1),
      count: 1,
      total: mockData.length,
      page: 1,
      pageCount: mockData.length,
    };

    return request(app.getHttpServer())
      .get('/todos')
      .query({
        page: 1,
        limit: 1,
      })
      .expect(200)
      .expect(expected);
  });

  it('/todos/:id (POST)', () => {
    const newItem = {
      id: 4,
      name: 'new_name',
      title: 'new_title',
      description: 'new_descr',
    };

    return request(app.getHttpServer())
      .post('/todos')
      .send(newItem)
      .expect(201)
      .expect(newItem);
  });

  it('/todos/:id (DELETE)', async () => {
    await request(app.getHttpServer()).delete('/todos/1').expect(200);

    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect(mockData.slice(1));
  });

  it('/todos/:id (PUT)', async () => {
    const updatedFields = {
      name: 'updated_name',
      title: 'updated_title',
      description: 'updated_descr',
    };

    const res = [
      {
        id: 1,
        ...updatedFields,
      },
      ...mockData.slice(1),
    ];

    await request(app.getHttpServer())
      .put('/todos/1')
      .send(updatedFields)
      .expect(200);

    return request(app.getHttpServer()).get('/todos').expect(200).expect(res);
  });
});
