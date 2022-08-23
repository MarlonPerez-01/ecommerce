import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindProveedoresDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'nombre'])
  sort?: 'id' | 'empresa' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
