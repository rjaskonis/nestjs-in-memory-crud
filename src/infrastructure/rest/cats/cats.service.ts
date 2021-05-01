import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cats.model';

@Injectable()
export class CatsService {
    private cats: Cat[];

    constructor() {
        this.cats = new Array<Cat>();
    }

    getCats(): Cat[] {
        return this.cats;
    }

    addCat(name: string, breed: string) {
        const id = this.cats.length + 1;
        const cat = new Cat(id, name, breed);
        this.cats.push(cat);

        return id;
    }

    updateCat(id: number, name: string, breed: string) {
        const [cat, catIndex] = this.findCat(id);
        const updatedCat = { ...cat };

        updatedCat.name = name || updatedCat.name;
        updatedCat.breed = breed || updatedCat.breed;

        this.cats[catIndex] = updatedCat;
    }

    private findCat(id: number): [Cat, number] {
        const catIndex = this.cats.findIndex((c) => c.id === id);
        const cat = this.cats[catIndex];

        if (!cat) {
            throw new NotFoundException('Could not find cat');
        }
        return [cat, catIndex];
    }
}
