import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // console.log('value is: ', value);

        return (value as string).toUpperCase();
    }
}
