import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CriarMensagemCommand } from 'src/mensagem/dominio/command/criarMensagem.command';

@Injectable()
export class MensagemRepository {
  constructor(private prismaService: PrismaService) {}

  async cadastrar(criarMensagemCommand: CriarMensagemCommand) {
    return this.prismaService.mensagem.create({
      data: criarMensagemCommand,
    });
  }
}
