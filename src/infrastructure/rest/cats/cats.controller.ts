import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
} from '@nestjs/common';
import { DashLettersPipe } from '../common/pipes/dash-letters.pipe';
import { UpperCasePipe } from '../common/pipes/uppercase.pipe';
import { Cat } from './cats.model';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getCats(): Cat[] {
        return this.catService.getCats();
    }

    @Post()
    addCat(@Body('name') name: string, @Body('breed') breed: string) {
        const generatedId = this.catService.addCat(name, breed);
        return { id: generatedId };
    }

    @Put(':id')
    @UsePipes(UpperCasePipe, DashLettersPipe)
    updateCat(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, // 406
            }), // or @Param('id', ParseIntPipe) // 400
        )
        id: number,
        @Body('name') name: string,
        @Body('breed') breed: string,
    ) {
        console.log(typeof id, name, breed);

        this.catService.updateCat(id, name, breed);
        return null;
    }
}
