import { Inject, Injectable } from '@nestjs/common';
import { PessoaFisicaRequest } from '../dto/pessoa-fisica.request';
import { PessoaFisicaRepository } from '../../domain/repository/pessoa-fisica-repository';

import { PessoaFisica } from '../../domain/model/pessoa-fisica.entity';
@Injectable()
export class PessoaFisicaService {
  
  constructor(
    @Inject('PessoaFisicaRepository')
    private readonly repository: PessoaFisicaRepository,
  ) {}

  async findById(id: number): Promise<PessoaFisica | null> {
    return this.repository.findById(id);               
  }

  async cadastrar(pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisica>  {        
    const existingPessoa = await this.repository.findByCpf(pessoaFisica.cpf);

    if (existingPessoa) {
      throw new Error('Já existe uma pessoa física cadastrada com este CPF.');
    }

    const novaPessoaFisica = new PessoaFisica(      
      pessoaFisica.nome,
      pessoaFisica.cpf,
      new Date(pessoaFisica.dataNascimento),
      new Date()
    );
    
    const savedEntity = await this.repository.create(novaPessoaFisica);

    if (!savedEntity) {
      throw new Error('Erro ao cadastrar a pessoa física.');
    }
    return savedEntity;
  }
}