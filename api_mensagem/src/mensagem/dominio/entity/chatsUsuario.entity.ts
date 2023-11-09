import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class ChatsUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.chatsUsuario)
  usuario: Usuario;

  @ManyToOne(() => Chat, (chat) => chat.chatsUsuario)
  chat: Chat;
}
