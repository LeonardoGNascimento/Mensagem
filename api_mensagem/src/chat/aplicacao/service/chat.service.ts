import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarChatCommand } from 'src/chat/dominio/command/criarChat.command';
import { ChatRepository } from 'src/chat/infra/repository/chat.repository';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async buscarPorCodigo(codigo: string) {
    return await this.chatRepository.buscarPorCodigo(codigo);
  }

  async criar(criarChatCommand: CriarChatCommand) {
    return await this.chatRepository.criar(criarChatCommand);
  }

  async listar() {
    const chats = await this.chatRepository.listar();

    if (!chats) {
      throw new NotFoundException('Nenhum chat encontrado');
    }

    return chats;
  }
}
