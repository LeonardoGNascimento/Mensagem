import { Logger, UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { log } from 'console';
import { Server } from 'socket.io';
import { ChatService } from 'src/chat/aplicacao/service/chat.service';
import { WsAuthGuard } from 'src/core/jwt/ws.guard';
import { MensagemService } from 'src/mensagem/aplicacao/service/mensagem.service';
import { setTimeout } from 'node:timers/promises';
import { Ws2AuthGuard } from 'src/core/jwt/ws2.guard';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway {
  @WebSocketServer() server: Server;

  constructor(
    private chatService: ChatService,
    private mensagemService: MensagemService,
  ) {}

  @UseGuards(Ws2AuthGuard)
  @SubscribeMessage('criar_chat')
  async handleCriarChat(@ConnectedSocket() client: any, @MessageBody() chat: any) {
    log(chat);
    const chatExiste = await this.chatService.buscarPorCodigo(chat.chat);

    if (!chatExiste) {
      this.chatService.criar({
        codigo: chat.chat,
      });
    }

    const mensagens = chatExiste ? await this.mensagemService.buscarPorChat(chatExiste.id) : [];

    client.join(chat.chat);
    client.emit('historico', mensagens);
  }

  @UseGuards(Ws2AuthGuard)
  @SubscribeMessage('enviar')
  async handleEnviar(@ConnectedSocket() client: any, @MessageBody() chat: any) {
    if (chat.arquivo) {
      chat.mensagem = chat.mensagem[0];
    }

    const usuario = client.handshake.headers.user;
    const chatExiste = await this.chatService.buscarPorCodigo(chat.chat);

    // this.mensagemService.cadastrar({
    //   chatId: chatExiste.id,
    //   mensagem: chat.mensagem,
    //   usuarioId: usuario.id,
    // });

    this.server.to(chat.chat).emit('recebido', { ...chat, usuario });
  }
}
