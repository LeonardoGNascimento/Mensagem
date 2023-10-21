import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from 'src/chat/aplicacao/service/chat.service';
import { WsAuthGuard } from 'src/core/jwt/ws.guard';
import { MensagemService } from 'src/mensagem/aplicacao/service/mensagem.service';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway {
  @WebSocketServer() server: Server;

  constructor(
    private chatService: ChatService,
    private mensagemService: MensagemService,
  ) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('criar_chat')
  async handleCriarChat(
    @ConnectedSocket() client: any,
    @MessageBody() chat: any,
  ) {
    const chatExiste = await this.chatService.buscarPorCodigo(chat.chat);

    if (!chatExiste) {
      this.chatService.criar({
        codigo: chat.chat,
      });
    }

    client.join(chat.chat);
    client.emit('historico', chatExiste ? chatExiste.Mensagem : []);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('recebido')
  async handleRecebido(
    @ConnectedSocket() client: any,
    @MessageBody() chat: any,
  ) {
    const user = client.handshake.user;
    const chatExiste = await this.chatService.buscarPorCodigo(chat.chat);

    this.mensagemService.cadastrar({
      chatId: chatExiste.id,
      mensagem: chat.mensagem,
      usuarioId: user.id,
    });

    this.server.to(chat.chat).emit('recebido', chat);
  }
}
