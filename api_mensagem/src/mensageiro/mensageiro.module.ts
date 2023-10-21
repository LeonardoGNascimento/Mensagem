import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './webSocket.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { MensagemModule } from 'src/mensagem/mensagem.module';

@Module({
  imports: [ChatModule, MensagemModule],
  providers: [WebsocketsGateway],
})
export class MensageiroModule {}
