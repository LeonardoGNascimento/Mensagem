import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { CoreModule } from './core/core.module';
import { JwtStrategy } from './core/jwt/jwt.strategy';
import { WsJwtStrategy } from './core/jwt/ws.strategy';
import { MensageiroModule } from './mensageiro/mensageiro.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CoreModule, UsuarioModule, MensageiroModule, MensagemModule, ChatModule],
  providers: [JwtStrategy, WsJwtStrategy],
})
export class AppModule {}
