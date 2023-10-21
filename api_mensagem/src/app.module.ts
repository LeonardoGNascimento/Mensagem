import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { MensageiroModule } from './mensageiro/mensageiro.module';
import { JwtModule } from '@nestjs/jwt';
import { MensagemModule } from './mensagem/mensagem.module';
import { JwtStrategy } from './core/jwt/jwt.strategy';
import { WsJwtStrategy } from './core/jwt/ws.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'topSecret512',
      signOptions: {
        expiresIn: '60d',
      },
    }),
    PrismaModule,
    UsuarioModule,
    MensageiroModule,
    MensagemModule,
    ChatModule,
  ],
  controllers: [],
  providers: [JwtStrategy, WsJwtStrategy],
})
export class AppModule {}
