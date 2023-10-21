import { Injectable } from '@nestjs/common';
import { CriarMensagemCommand } from 'src/mensagem/dominio/command/criarMensagem.command';
import { MensagemRepository } from 'src/mensagem/infra/repository/mensagem.repository';

@Injectable()
export class MensagemService {
  constructor(private mensagemRepository: MensagemRepository) {}

  async cadastrar(criarMensagemCommand: CriarMensagemCommand) {
    return await this.mensagemRepository.cadastrar(criarMensagemCommand);
  }
}
