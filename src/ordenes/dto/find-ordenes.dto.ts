import { IsIn, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindOrdenesDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'nombre'])
  sort?: 'id' | 'estadoEnvio' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
