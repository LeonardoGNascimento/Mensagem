import { Module } from '@nestjs/common';
import { ChatService } from './aplicacao/service/chat.service';
import { ChatRepository } from './infra/repository/chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/mensagem/dominio/entity/chat.entity';
import { ChatController } from './aplicacao/controller/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  exports: [ChatService, ChatRepository],
})
export class ChatModule {}
