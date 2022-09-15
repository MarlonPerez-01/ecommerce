import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import RoleGuard from '../auth/guards/role.guard';
import { RoleEnum } from '../common/enums/role.enum';
import LocalFileInterceptor from '../local-file/interceptors/local-file.interceptor';
import { CreateProductoDto } from './dto/create-producto.dto';
import { FindProductosDTO } from './dto/find-productos.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosService } from './productos.service';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@Query() findProductosDTO: FindProductosDTO) {
    return this.productosService.findAll(findProductosDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Post('images')
  @UseInterceptors(
    LocalFileInterceptor({
      fieldName: 'file',
      path: '/products',
    }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({
            fileType: new RegExp('(jpe?g|png|gif)$'),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return { fileName: file.filename };
  }
}
