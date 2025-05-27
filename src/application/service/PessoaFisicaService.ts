import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaFisicaEntity } from '../../domain/model/PessoaFisicaEntity';
import { PessoaFisicaRequest } from '../dto/PessoaFisicaRequest';
import { PessoaFisicaResponse } from '../dto/PessoaFisicaResponse';


@Injectable()
export class PessoaFisicaService {
  constructor(
    @InjectRepository(PessoaFisicaEntity)
    private readonly pessoaFisicaRepository: Repository<PessoaFisicaEntity>,
  ) {}

  async findById(id: number): Promise<PessoaFisicaResponse | null> {
    const entity = await this.pessoaFisicaRepository.findOne({ where: { id } });
    /* return entity ? PessoaFisicaService.toPessoaFisicaResponse(entity) : null; */
    
    return PessoaFisicaService.toPessoaFisicaResponse(entity);

  }

  async cadastrarPessoaFisica(pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisicaResponse | null>  {        
    const existingPessoa = await this.pessoaFisicaRepository.findOne({
      where: { cpf: pessoaFisica.cpf },
    });

    if (existingPessoa) {
      throw new Error('Já existe uma pessoa física cadastrada com este CPF.');
    }

    const novaPessoaFisica = new PessoaFisicaEntity(      
      pessoaFisica.nome,
      pessoaFisica.cpf,
      new Date(pessoaFisica.dataNascimento),
      new Date(pessoaFisica.dataCadastro),
    );
    
    const savedEntity = await this.pessoaFisicaRepository.save(novaPessoaFisica);
    return PessoaFisicaService.toPessoaFisicaResponse(savedEntity);
  }


  static toPessoaFisicaResponse(entity: PessoaFisicaEntity | null): PessoaFisicaResponse | null {
    if (!entity) return null;
    const response = new PessoaFisicaResponse();    
    response.nome = entity.nome;
    response.cpf = entity.cpf;
    response.dataNascimento = entity.dataNascimento.toISOString().split('T')[0]
    response.dataCadastro = entity.dataCadastro.toISOString().split('T')[0];
    
    return response;
  }
}