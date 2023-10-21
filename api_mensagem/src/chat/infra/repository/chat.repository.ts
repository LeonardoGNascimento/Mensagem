import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { Chat, Usuario } from '@prisma/client';
import { CriarChatCommand } from 'src/chat/dominio/command/criarChat.command';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  async buscarPorCodigo(codigo: string) {
    return await this.prisma.chat.findUnique({
      include: {
        Mensagem: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      where: { codigo },
    });
  }

  async criar(criarChatCommand: CriarChatCommand): Promise<Chat> {
    return await this.prisma.chat.create({
      data: criarChatCommand,
    });
  }

  async listar(): Promise<Chat[]> {
    return await this.prisma.chat.findMany();
  }
}
