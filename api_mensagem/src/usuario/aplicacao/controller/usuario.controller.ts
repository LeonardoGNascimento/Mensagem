import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { LogarCommand } from 'src/usuario/dominio/command/logar.command';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post('/login')
  login(@Body() logarCommand: LogarCommand) {
    return this.usuarioService.login(logarCommand);
  }

  @Post()
  criar(@Body() criarUsuarioCommand: CriarUsuarioCommand) {
    return this.usuarioService.criar(criarUsuarioCommand);
  }

  @Get()
  listar() {
    return this.usuarioService.listar();
  }
}
