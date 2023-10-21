import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { Usuario } from '@prisma/client';
import { LogarCommand } from 'src/usuario/dominio/command/logar.command';

@Injectable()
export class UsuarioRepository {
  constructor(private prisma: PrismaService) {}

  async login(logarCommand: LogarCommand) {
    return await this.prisma.usuario.findFirst({
      where: {
        email: logarCommand.email,
        senha: logarCommand.senha,
      },
    });
  }

  async buscarPorEmail(email: string) {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }

  async criar(criarUsuarioCommand: CriarUsuarioCommand) {
    return await this.prisma.usuario.create({
      data: criarUsuarioCommand,
    });
  }

  async listar(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }
}
