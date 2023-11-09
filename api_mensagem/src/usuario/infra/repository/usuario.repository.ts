import { Injectable } from '@nestjs/common';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { LogarCommand } from 'src/usuario/dominio/command/logar.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async login({ email }: LogarCommand) {
    return await this.usuarioRepository.findOneBy({
      email,
    });
  }

  async buscarPorEmail(email: string) {
    return await this.usuarioRepository.findOneBy({
      email,
    });
  }

  async criar(criarUsuarioCommand: CriarUsuarioCommand) {
    return await this.usuarioRepository.save(criarUsuarioCommand);
  }

  async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
}
