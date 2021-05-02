import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotAcceptableException,
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
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getCats(): Cat[] {
        return this.catService.getCats();
    }

    @Post()
    addCat(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto);

        const createdCat = this.catService.addCat(
            createCatDto.name,
            createCatDto.breed,
        );
        return createdCat;
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
        @Body() updateCatDto: UpdateCatDto,
    ) {
        console.log(typeof id, updateCatDto.name, updateCatDto.breed);

        this.catService.updateCat(id, updateCatDto.name, updateCatDto.breed);
        return null;
    }
}
