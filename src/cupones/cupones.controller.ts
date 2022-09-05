import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CuponesService } from './cupones.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponeDto } from './dto/update-cupon.dto';

@Controller('cupones')
export class CuponesController {
  constructor(private readonly cuponesService: CuponesService) {}

  @Post()
  create(@Body() createCuponeDto: CreateCuponDto) {
    return this.cuponesService.create(createCuponeDto);
  }

  @Get()
  findAll() {
    return this.cuponesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuponesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuponeDto: UpdateCuponeDto) {
    return this.cuponesService.update(+id, updateCuponeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuponesService.remove(+id);
  }
}
