import { IsDefined } from 'class-validator';

export class VerifyAccountDto {
  @IsDefined()
  codigo: string;
}
