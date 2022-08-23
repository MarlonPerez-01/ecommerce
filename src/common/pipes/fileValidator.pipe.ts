import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!Array.isArray(value) && value.length) {
      throw new BadRequestException();
    }

    const files = Promise.all(
      value.map((file: Express.Multer.File) => this.validate(file)),
    );

    return files;
  }

  validate(file: Express.Multer.File) {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return file;
    } else {
      throw new UnsupportedMediaTypeException();
    }
  }
}
