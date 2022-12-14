import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import RoleGuard from '../auth/guards/role.guard';
import { RoleEnum } from '../common/enums/role.enum';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { FindProveedoresDto } from './dto/find-proveedores.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedoresService } from './proveedores.service';

@ApiTags('proveedores')
@Controller('proveedores')
@UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
@UseGuards(AccessTokenGuard)
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedoreDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  findAll(@Query() findProveedoresDto: FindProveedoresDto) {
    return this.proveedoresService.findAll(findProveedoresDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProveedoreDto: UpdateProveedorDto,
  ) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.proveedoresService.remove(id);
  }
}
