import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindProveedoresDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn([
    'id',
    'primerNombre',
    'primerApellido',
    'correo',
    'telefono',
    'empresa',
  ])
  sort?:
    | 'id'
    | 'primerNombre'
    | 'primerApellido'
    | 'correo'
    | 'telefono'
    | 'empresa' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  primerNombre?: string;

  @IsOptional()
  @IsString()
  primerApellido?: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsOptional()
  @IsNumber()
  telefono?: number;

  @IsOptional()
  @IsString()
  correo?: string;
}
