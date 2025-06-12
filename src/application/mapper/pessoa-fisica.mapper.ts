import { PessoaFisica } from '../../domain/model/pessoa-fisica.entity';
import { PessoaFisicaResponse } from '../dto/pessoa-fisica.response';

export class PessoaFisicaMapper {
  static toResponse(entity: PessoaFisica): PessoaFisicaResponse {   
    /* const response = new PessoaFisicaResponse();
    response.nome = entity.nome;
    response.cpf = entity.cpf;
    response.dataNascimento = entity.dataNascimento;
    response.dataCadastro = entity.dataCadastro; */
    return entity as PessoaFisicaResponse;
  }
}