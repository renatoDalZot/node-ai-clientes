import { PessoaFisica } from '../../domain/model/PessoaFisica';
import { PessoaFisicaResponse } from '../dto/PessoaFisicaResponse';

export class PessoaFisicaMapper {
  static toResponse(entity: PessoaFisica | null): PessoaFisicaResponse | null {
    if (!entity) return null;
    const response = new PessoaFisicaResponse();
    response.nome = entity.nome;
    response.cpf = entity.cpf;
    response.dataNascimento = entity.dataNascimento;
    response.dataCadastro = entity.dataCadastro;
    return response;
  }
}