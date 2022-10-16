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
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { FindOrdenesDto } from './dto/find-ordenes.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { OrdenesService } from './ordenes.service';

@ApiTags('ordenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  create(@Body() createOrdeneDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdeneDto);
  }

  @Get()
  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  findAll(@Query() findOrdenesDTO: FindOrdenesDto) {
    return this.ordenesService.findAll(findOrdenesDTO);
  }

  @Get(':id')
  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: number) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: number, @Body() updateOrdeneDto: UpdateOrdenDto) {
    return this.ordenesService.update(id, updateOrdeneDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: number) {
    return this.ordenesService.remove(id);
  }
}
