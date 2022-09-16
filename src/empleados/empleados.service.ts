import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CargosService } from '../cargos/cargos.service';
import { paginate } from '../common/helpers/paginate';
import { PersonasService } from '../personas/personas.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { FindEmpleadosDto } from './dto/find-empleados.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    private readonly cargosService: CargosService,
    private readonly personasService: PersonasService,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const cargo = await this.cargosService.findOne(createEmpleadoDto.cargoId);

    if (!cargo) throw new UnprocessableEntityException('Cargo inválido');

    const persona = await this.personasService.create({
      primerNombre: createEmpleadoDto.primerNombre,
      segundoNombre: createEmpleadoDto.segundoNombre,
      primerApellido: createEmpleadoDto.primerApellido,
      segundoApellido: createEmpleadoDto.segundoApellido,
      telefono: createEmpleadoDto.telefono,
    });

    const empleado = this.empleadoRepository.create({
      persona,
      cargo,
      genero: createEmpleadoDto.genero,
      salario: createEmpleadoDto.salario,
      fechaNacimiento: createEmpleadoDto.fechaNacimiento,
    });

    return this.empleadoRepository.save(empleado);
  }

  async findAll(findEmpleadosDTO: FindEmpleadosDto) {
    const { page, limit, sort, order } = findEmpleadosDTO;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.empleadoRepository.findAndCount({
      take: limit,
      skip,
      order: { [sort]: order },
      relations: ['persona', 'cargo'],
    });

    const pagination = paginate(page, limit, totalItems);

    return {
      data,
      totalItems,
      ...pagination,
    };
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOne({
      where: { id },
      relations: ['persona', 'cargo'],
    });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const cargo = await this.cargosService.findOne(updateEmpleadoDto.cargoId);
    if (!cargo) throw new UnprocessableEntityException('Cargo inválido');

    const empleado = await this.empleadoRepository.findOne({
      where: { id },
      relations: ['persona', 'cargo', 'persona.direcciones'],
    });

    if (!empleado) throw new NotFoundException('Empleado no encontrado');

    const empleadoActualizado = this.empleadoRepository.merge(empleado, {
      persona: {
        primerNombre: updateEmpleadoDto.primerNombre,
        segundoNombre: updateEmpleadoDto.segundoNombre,
        primerApellido: updateEmpleadoDto.primerApellido,
        segundoApellido: updateEmpleadoDto.segundoApellido,
        telefono: updateEmpleadoDto.telefono,
        direcciones: [updateEmpleadoDto.direccion],
      },
      cargo: {
        id: updateEmpleadoDto.cargoId,
      },
      genero: updateEmpleadoDto.genero,
      salario: updateEmpleadoDto.salario,
      fechaNacimiento: updateEmpleadoDto.fechaNacimiento,
    });

    return this.empleadoRepository.save(empleadoActualizado);
  }

  async remove(id: number) {
    const eliminado = await this.empleadoRepository.softDelete(id);
    if (!eliminado) throw new NotFoundException('Empleado no encontrado');
    return eliminado;
  }
}
