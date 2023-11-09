import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatsUsuario } from './chatsUsuario.entity';
import { Mensagem } from './mensagem.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @OneToMany(() => ChatsUsuario, (chatsUsuario) => chatsUsuario.chat)
  chatsUsuario: ChatsUsuario[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.chat)
  mensagens: Mensagem[];
}
