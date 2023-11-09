import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { CriarMensagemCommand } from 'src/mensagem/dominio/command/criarMensagem.command';
import { Mensagem } from 'src/mensagem/dominio/entity/mensagem.entity';
import { LessThan, Not, Repository } from 'typeorm';

@Injectable()
export class MensagemRepository {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
  ) {}

  async cadastrar({ chatId, mensagem, usuarioId }: CriarMensagemCommand) {
    return await this.mensagemRepository.save({
      dataHora: new Date(),
      chat: {
        id: chatId,
      },
      mensagem,
      usuario: {
        id: usuarioId,
      },
    });
  }

  async buscarPorChat(chatId: number) {
    // relations: ['mensagens', 'mensagens.usuario']
    return this.mensagemRepository.find({
      where: {
        chat: {
          id: chatId,
        },
      },
      relations: {
        usuario: true,
      },
      take: 10000,
    });
  }

  async buscarPorChatDiaAnterior(chatId: number) {
    try {
      const dataAtual = format(new Date(), 'yyyy-MM-dd');

      const queryBuild = this.mensagemRepository.createQueryBuilder('mensagem');

      return await queryBuild
        .leftJoinAndSelect('mensagem.usuario', 'usuario')
        .where('mensagem.chat.id = :chatId', { chatId })
        .andWhere('mensagem.dataHora > :dataAtual', { dataAtual })
        .getMany();
    } catch (e) {
      return [];
    }
  }

  async buscarPorChatDiaAtual(chatId: number) {
    try {
      const dataAtual = format(new Date(), 'yyyy-MM-dd');

      const queryBuild = this.mensagemRepository.createQueryBuilder('mensagem');

      return await queryBuild
        .leftJoinAndSelect('mensagem.usuario', 'usuario')
        .where('mensagem.chat.id = :chatId', { chatId })
        .andWhere('mensagem.dataHora <= :dataAtual', { dataAtual })
        .getMany();
    } catch (e) {
      return [];
    }
  }
}
