import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { CreateCuponeDto } from './dto/create-cupone.dto';
import { UpdateCuponeDto } from './dto/update-cupone.dto';

@Controller('cupones')
export class CuponesController {
  constructor(private readonly cuponesService: CuponesService) {}

  @Post()
  create(@Body() createCuponeDto: CreateCuponeDto) {
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
