import { IsNotEmpty } from 'class-validator';

export class LogarCommand {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;
}
