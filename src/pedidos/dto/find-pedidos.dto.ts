import { IsIn, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindPedidosDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'nombre'])
  sort?: 'id' | 'total' | 'estadoEnvio' | 'estadoPendiente' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
