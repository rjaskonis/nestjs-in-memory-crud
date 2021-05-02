import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '@infrastructure/rest/cats/cats.controller';
import { CatsService } from '@infrastructure/rest/cats/cats.service';
import { Cat } from '@/infrastructure/rest/cats/cats.model';

describe('CatsController', () => {
    let catsController: CatsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatsService],
        }).compile();

        catsController = app.get<CatsController>(CatsController);
    });

    it('should return array of Cats', () => {
        const { id: firstCatId } = catsController.addCat({
            name: 'Xane',
            breed: 'American',
        });
        const { id: secondCatId } = catsController.addCat({
            name: 'Pussy',
            breed: 'American',
        });

        catsController.updateCat(2, {
            name: 'Pretty Pussy',
            breed: 'American',
        });

        const result = catsController.getCats();
        console.log(result);

        // expect(true).toBe(true);
        expect(result.constructor).toBe(Array);
        expect(result.length).toBe(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Pretty Pussy' }),
            ]),
        );
    });
});
