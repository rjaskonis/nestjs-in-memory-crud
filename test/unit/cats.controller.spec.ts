import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '@infrastructure/http/cats/cats.controller';
import { CatsService } from '@infrastructure/http/cats/cats.service';
import { Cat } from '@/infrastructure/http/cats/cats.model';

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
        const { id: firstCatId } = catsController.addCat('Xane', 'American');
        const { id: secondCatId } = catsController.addCat('Pussy', 'American');

        catsController.updateCat(2, 'Pretty Pussy', 'American');

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
