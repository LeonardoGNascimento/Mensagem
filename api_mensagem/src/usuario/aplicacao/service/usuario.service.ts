import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { LogarCommand } from 'src/usuario/dominio/command/logar.command';
import { ListarUsuarioQuery } from 'src/usuario/dominio/query/listarUsuario.query';
import { UsuarioRepository } from 'src/usuario/infra/repository/usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async login(logarCommand: LogarCommand) {
    const usuario = await this.usuarioRepository.login(logarCommand);

    if (!usuario) {
      throw new BadRequestException('E-mail ou senha incorreto');
    }

    return {
      access_token: this.jwtService.sign({
        id: usuario.id,
        nome: usuario.nome,
      }),
    };
  }

  async criar(criarUsuarioCommand: CriarUsuarioCommand) {
    const emailExiste = await this.usuarioRepository.buscarPorEmail(
      criarUsuarioCommand.email,
    );

    if (emailExiste) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    return await this.usuarioRepository.criar(criarUsuarioCommand);
  }

  async listar(): Promise<ListarUsuarioQuery[]> {
    const usuarios = await this.usuarioRepository.listar();

    if (!usuarios) {
      throw new NotFoundException('E-mail já cadastrado');
    }

    return usuarios.map((item) => ({
      nome: item.nome,
      email: item.email,
      id: item.id,
    }));
  }
}
