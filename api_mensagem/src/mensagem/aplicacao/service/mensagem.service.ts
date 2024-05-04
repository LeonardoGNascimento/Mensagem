import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { log } from 'console';
import { CriarMensagemCommand } from 'src/mensagem/dominio/command/criarMensagem.command';
import { Mensagem } from 'src/mensagem/dominio/entity/mensagem.entity';
import { MensagemRepository } from 'src/mensagem/infra/repository/mensagem.repository';

@Injectable()
export class MensagemService {
  constructor(
    private mensagemRepository: MensagemRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async cadastrar(criarMensagemCommand: CriarMensagemCommand) {
    return await this.mensagemRepository.cadastrar(criarMensagemCommand);
  }

  async buscarPorChat(chatId: number): Promise<Mensagem[]> {
    let mensagensCache: any[] = await this.cacheManager.get(`${chatId}`);

    if (!mensagensCache) {
      mensagensCache = await this.mensagemRepository.buscarPorChatDiaAnterior(chatId);
      await this.cacheManager.set(`${chatId}`, mensagensCache, 100000);
    }

    const mensagensDia = await this.mensagemRepository.buscarPorChatDiaAtual(chatId);

    return [...mensagensCache, ...mensagensDia];
  }
}
