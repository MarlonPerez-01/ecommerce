import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);
    return this.tokenRepository.save(token);
  }

  findAll() {
    return `This action returns all tokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }

  async findOneByToken(token: string) {
    const tokenDB = await this.tokenRepository.findOneBy({ token });
    if (!tokenDB) throw new NotFoundException('Token no encontrado');
    return tokenDB;
  }

  async removeByToken(token: string) {
    const tokenDB = await this.findOneByToken(token);
    if (!tokenDB) throw new NotFoundException('Token no encontrado');
    return this.tokenRepository.delete({ token });
  }
}
