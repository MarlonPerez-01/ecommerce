import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { FindProveedoresDto } from './dto/find-proveedores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('proveedores')
@Controller('proveedores')
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
