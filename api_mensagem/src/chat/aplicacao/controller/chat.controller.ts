import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../service/chat.service';

@Controller({ path: 'chat' })
export class ChatController {
  constructor(private service: ChatService) {}

  @Get()
  async listar() {
    return this.service.listar();
  }
}
