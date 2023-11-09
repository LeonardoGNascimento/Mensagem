import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { LogarCommand } from 'src/usuario/dominio/command/logar.command';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensagem } from 'src/mensagem/dominio/entity/mensagem.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { HashPipe } from 'src/core/pipes/hash.pipe';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private http: HttpService,
    @InjectRepository(Mensagem) private mensagem: Repository<Mensagem>,
  ) {}

  @Post('/login')
  login(@Body() logarCommand: LogarCommand) {
    return this.usuarioService.login(logarCommand);
  }

  @Post()
  async criar(
    @Body('senha', HashPipe) senhaHash: string,
    @Body()
    { senha, ...criarUsuarioCommand }: CriarUsuarioCommand,
  ) {
    return await this.usuarioService.criar({
      senha: senhaHash,
      ...criarUsuarioCommand,
    });
  }

  @Get()
  listar() {
    return this.usuarioService.listar();
  }
}
