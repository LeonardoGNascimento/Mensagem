import { Module } from '@nestjs/common';
import { MensagemService } from './aplicacao/service/mensagem.service';
import { MensagemRepository } from './infra/repository/mensagem.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  providers: [MensagemService, MensagemRepository, PrismaService],
  exports: [MensagemService, MensagemRepository],
})
export class MensagemModule {}
