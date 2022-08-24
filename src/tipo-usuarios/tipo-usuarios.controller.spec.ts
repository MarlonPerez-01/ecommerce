import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuariosController } from './tipo-usuarios.controller';
import { TipoUsuariosService } from './tipo-usuarios.service';

describe('TipoUsuariosController', () => {
  let controller: TipoUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoUsuariosController],
      providers: [TipoUsuariosService],
    }).compile();

    controller = module.get<TipoUsuariosController>(TipoUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
