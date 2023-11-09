import { Module } from '@nestjs/common';
import { MensagemService } from './aplicacao/service/mensagem.service';
import { MensagemRepository } from './infra/repository/mensagem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './dominio/entity/mensagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem])],
  providers: [MensagemService, MensagemRepository],
  exports: [MensagemService, MensagemRepository],
})
export class MensagemModule {}
