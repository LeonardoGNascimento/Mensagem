import { Injectable } from '@nestjs/common';
import { CriarUsuarioCommand } from 'src/usuario/dominio/command/criarUsuario.command';
import { CriarChatCommand } from 'src/chat/dominio/command/criarChat.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/mensagem/dominio/entity/chat.entity';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async buscarPorCodigo(codigo: string) {
    return await this.chatRepository.findOne({
      where: { codigo },
    });

    // return await this.prisma.chat.findUnique({
    //   include: {
    //     Mensagem: {
    //       include: {
    //         usuario: {
    //           select: {
    //             id: true,
    //             nome: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   where: { codigo },
    // });
  }

  async criar(criarChatCommand: CriarChatCommand): Promise<Chat> {
    return await this.chatRepository.save(criarChatCommand);
  }

  async listar(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}
