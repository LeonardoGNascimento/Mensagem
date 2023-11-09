import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPipe implements PipeTransform {
  async transform(senha: string) {
    return await bcrypt.hash(senha, '$2b$10$p32v0aHEA/vh3nVIk7vqI.');
  }
}
