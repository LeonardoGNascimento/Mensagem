import { Module } from '@nestjs/common';
import { UsuarioController } from './aplicacao/controller/usuario.controller';
import { UsuarioService } from './aplicacao/service/usuario.service';
import { UsuarioRepository } from './infra/repository/usuario.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './dominio/entity/usuario.entity';
import { Mensagem } from 'src/mensagem/dominio/entity/mensagem.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Usuario, Mensagem])],
  controllers: [UsuarioController],
  providers: [UsuarioRepository, UsuarioService],
})
export class UsuarioModule {}
