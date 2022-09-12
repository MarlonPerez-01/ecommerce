import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MunicipiosService } from './municipios.service';

@ApiTags('municipios')
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.municipiosService.findOne(id);
  }
}
