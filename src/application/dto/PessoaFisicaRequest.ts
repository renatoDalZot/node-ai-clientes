import { IsString, IsDateString, IsNumber } from 'class-validator';

export class PessoaFisicaRequest {  
  @IsString()
  nome: string;
  @IsString()
  cpf: string;
  @IsDateString()
  dataNascimento: string;
}