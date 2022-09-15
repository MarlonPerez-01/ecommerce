import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: number) {
    return this.rolesRepository.findOneBy({ id });
  }
}
