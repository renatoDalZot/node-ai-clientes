import { strict } from 'assert';
import { IsString, IsDateString, IsNumber, IsDate } from 'class-validator';

export class PessoaFisicaRequest {  
  @IsString()
  nome: string;
  @IsString()
  cpf: string;
  @IsString()
  dataNascimento: string;
}