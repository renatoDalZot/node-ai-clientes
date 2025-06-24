import { PessoaFisica } from '../../domain/model/pessoa-fisica.entity';
import { PessoaFisicaResponse } from '../dto/pessoa-fisica.response';

export class PessoaFisicaMapper {
  static toResponse(entity: PessoaFisica): PessoaFisicaResponse {
    const response = new PessoaFisicaResponse();
    response.nome = entity.getNome;
    response.cpf = entity.getCpf;
    response.dataNascimento = entity.getDataNascimento;
    response.dataCadastro = entity.getDataCadastro;
    response.score = entity.getScore;
    return response;
  }
}