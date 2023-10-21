import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UsuarioController } from './aplicacao/controller/usuario.controller';
import { UsuarioService } from './aplicacao/service/usuario.service';
import { UsuarioRepository } from './infra/repository/usuario.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioRepository, UsuarioService, PrismaService],
})
export class UsuarioModule {}
