import { PessoaFisica } from '../../domain/model/PessoaFisica';
import { PessoaFisicaResponse } from '../dto/PessoaFisicaResponse';

export class PessoaFisicaMapper {
  static toResponse(entity: PessoaFisica): PessoaFisicaResponse {
   
    const response = new PessoaFisicaResponse();
    response.nome = entity.nome;
    response.cpf = entity.cpf;
    response.dataNascimento = entity.dataNascimento;
    response.dataCadastro = entity.dataCadastro;
    return response;
  }
}