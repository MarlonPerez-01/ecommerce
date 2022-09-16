import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';

import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@ApiTags('cargos')
@Controller('cargos')
@UseGuards(RoleGuard([RoleEnum.ADMINISTRADOR]))
@UseGuards(AccessTokenGuard)
export class CargosController {
  constructor(private readonly cargosService: CargosService) {}

  @Post()
  async create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.create(createCargoDto);
  }

  @Get()
  async findAll() {
    return this.cargosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.cargosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCargoDto: UpdateCargoDto,
  ) {
    return this.cargosService.update(id, updateCargoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.cargosService.remove(id);
  }
}
