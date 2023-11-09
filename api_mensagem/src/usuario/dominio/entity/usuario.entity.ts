import { ChatsUsuario } from 'src/mensagem/dominio/entity/chatsUsuario.entity';
import { Mensagem } from 'src/mensagem/dominio/entity/mensagem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => ChatsUsuario, (chatsUsuario) => chatsUsuario.usuario)
  chatsUsuario: ChatsUsuario[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.usuario)
  mensagens: Mensagem[];
}
