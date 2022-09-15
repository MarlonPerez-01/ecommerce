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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FindCategoriasDto } from './dto/find-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll(@Query() findCategoriasDto: FindCategoriasDto) {
    return this.categoriasService.findAll(findCategoriasDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }

  @Post(':id/image')
  uploadImage(@Param('id') id: number, @Body() image: string) {
    return 'upload image';
  }

  @Delete(':id/image')
  deleteImage(@Param('id') id: number, @Body() image: string) {
    return 'delete image';
  }
}
