import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@infrastructure/rest/app.module';
import { CatsController } from '@/infrastructure/rest/cats/cats.controller';

describe('CatsController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    test('GET /cats', async () => {
        const catsController = app.get<CatsController>(CatsController);

        catsController.addCat({ name: 'Top', breed: 'pussy' });

        const response = await request(app.getHttpServer()).get('/cats');

        console.log(response.body);

        expect(response.status).toBe(200);
        // return request(app.getHttpServer()).get('/cats').expect(200);
    });

    test('POST /cats', async () => {
        const response = await request(app.getHttpServer())
            .post('/cats')
            .send({ name: 'Cool', breed: 'Fine' });

        console.log(response.body);

        expect(response.status).toBe(201);
    });

    it('should return > 400 error on POST /cats - validation testing', async () => {
        const response = await request(app.getHttpServer())
            .post('/cats')
            .send({ name: 'Cool' });

        console.log(response.body);

        expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('PUT /cats/:id', async () => {
        await request(app.getHttpServer())
            .post('/cats')
            .send({ name: 'Cool', breed: 'Yummy' });

        await request(app.getHttpServer())
            .put('/cats/1')
            .send({ name: 'Cooler!' });

        const response = await request(app.getHttpServer()).get('/cats');

        console.log(response.body);

        expect(response.status).toBe(200);
    });
});
