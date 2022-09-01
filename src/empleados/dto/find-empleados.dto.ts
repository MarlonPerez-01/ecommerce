import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IsIn, IsOptional } from 'class-validator';

export class FindEmpleadosDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'email', 'telefono'])
  sort?: 'id' | 'email' | 'telefono' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
