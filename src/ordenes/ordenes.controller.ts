import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { FindOrdenesDto } from './dto/find-ordenes.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { OrdenesService } from './ordenes.service';

@ApiTags('ordenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  create(@Body() createOrdeneDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdeneDto);
  }

  @Get()
  findAll(@Query() findOrdenesDTO: FindOrdenesDto) {
    return this.ordenesService.findAll(findOrdenesDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrdeneDto: UpdateOrdenDto) {
    return this.ordenesService.update(id, updateOrdeneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordenesService.remove(id);
  }
}
