import { IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString()
  refreshToken: string;
}
