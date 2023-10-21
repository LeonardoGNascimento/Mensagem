import { Module } from '@nestjs/common';
import { ChatService } from './aplicacao/service/chat.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChatRepository } from './infra/repository/chat.repository';

@Module({
  providers: [ChatService, PrismaService, ChatRepository],
  exports: [ChatService, PrismaService, ChatRepository],
})
export class ChatModule {}
