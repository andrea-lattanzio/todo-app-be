import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isUUID(value)) {
      throw new BadRequestException(
        'Id parameter must be a valid UUID.'
      );
    }
    return value;
  }
}
