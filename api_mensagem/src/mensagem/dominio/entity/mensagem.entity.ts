import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Mensagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  dataHora: Date;

  @Column()
  mensagem: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.mensagens)
  usuario: Usuario;

  @ManyToOne(() => Chat, (chat) => chat.mensagens)
  chat: Chat;
}
