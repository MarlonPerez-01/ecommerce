import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DireccionesService } from '../direcciones/direcciones.service';
import { CreateDireccionDto } from '../direcciones/dto/create-direccion.dto';
import { UpdateDireccionDto } from '../direcciones/dto/update-direccion.dto';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    private readonly direccionesService: DireccionesService,
  ) {}

  async create(createPersonaDto: CreatePersonaDto) {
    const persona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(persona);
  }

  async findAll() {
    return `This action returns all personas`;
  }

  async findOne(id: number) {
    const persona = this.personaRepository.findOneBy({ id });
    if (!persona) throw new NotFoundException('Persona no encontrada');
    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    return this.personaRepository.save({ ...persona, ...updatePersonaDto });
  }

  async remove(id: number) {
    return `This action removes a #${id} persona`;
  }

  async addDireccion(id: number, direccion: CreateDireccionDto) {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['direcciones'],
    });
    if (!persona) throw new NotFoundException('Persona no encontrada');

    const nuevaDireccion = await this.direccionesService.create(
      persona.id,
      direccion,
    );

    persona.direcciones = [...persona.direcciones, nuevaDireccion];

    return this.personaRepository.save(persona);
  }

  async getDirecciones(id: number) {
    const direcciones = await this.personaRepository.findOne({
      where: { id },
      relations: [
        'direcciones',
        'direcciones.departamento',
        'direcciones.municipio',
      ],
    });
    if (!direcciones) throw new NotFoundException('Direcciones no encontradas');

    return direcciones.direcciones;
  }

  async getDireccion(id: number, direccionId: number) {
    const direccion = await this.personaRepository.findOne({
      where: { id },
      relations: [
        'direcciones',
        'direcciones.departamento',
        'direcciones.municipio',
      ],
    });
    if (!direccion) throw new NotFoundException('Direccion no encontrada');

    const direccionFiltrada = direccion.direcciones.find(
      (direccion) => direccion.id === direccionId,
    );

    if (!direccionFiltrada)
      throw new NotFoundException('Direccion no encontrada');

    return direccionFiltrada;
  }

  async updateDireccion(
    id: number,
    direccionId,
    direccion: UpdateDireccionDto,
  ) {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['direcciones'],
    });

    if (!persona) throw new NotFoundException('Persona no encontrada');

    const direccionActualizada = await this.direccionesService.update(
      persona.id,
      direccionId,
      direccion,
    );

    persona.direcciones = persona.direcciones.map((direccion) =>
      direccion.id === direccionActualizada.id
        ? direccionActualizada
        : direccion,
    );

    return this.personaRepository.save(persona);
  }

  async removeDireccion(id: number, direccionId: number) {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['direcciones'],
    });
    if (!persona) throw new NotFoundException('Persona no encontrada');

    await this.direccionesService.remove(direccionId);

    persona.direcciones = persona.direcciones.filter(
      (direccion) => direccion.id !== direccionId,
    );

    return this.personaRepository.save(persona);
  }
}
