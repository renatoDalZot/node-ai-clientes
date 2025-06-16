import { PessoaFisica } from '../model/pessoa-fisica.entity';

export interface PessoaFisicaRepository {
  findByCpf(cpf: string): Promise<PessoaFisica | null>;
  findById(id: number): Promise<PessoaFisica | null>;
  create(data: Omit<PessoaFisica, 'id' >): Promise<PessoaFisica>;  
}