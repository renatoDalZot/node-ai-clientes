import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaFisica as PessoaFisica } from '../../domain/model/PessoaFisica';
import { PessoaFisicaRequest } from '../dto/PessoaFisicaRequest';
import { PessoaFisicaResponse } from '../dto/PessoaFisicaResponse';
import { PessoaFisicaMapper } from '../mapper/PessoaFisicaMapper';


@Injectable()
export class PessoaFisicaService {
  constructor(
    @InjectRepository(PessoaFisica)
    private readonly pessoaFisicaRepository: Repository<PessoaFisica>,
  ) {}

  async findById(id: number): Promise<PessoaFisicaResponse | null> {
    const entity = await this.pessoaFisicaRepository.findOne({ where: { id } });
    /* return entity ? PessoaFisicaService.toPessoaFisicaResponse(entity) : null; */
    
    return PessoaFisicaMapper.toResponse(entity);

  }

  async cadastrarPessoaFisica(pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisicaResponse | null>  {        
    const existingPessoa = await this.pessoaFisicaRepository.findOne({
      where: { cpf: pessoaFisica.cpf },
    });

    if (existingPessoa) {
      throw new Error('Já existe uma pessoa física cadastrada com este CPF.');
    }

    const novaPessoaFisica = new PessoaFisica(      
      pessoaFisica.nome,
      pessoaFisica.cpf,
      new Date(pessoaFisica.dataNascimento.toString()),
      new Date()
    );
    
    const savedEntity = await this.pessoaFisicaRepository.save(novaPessoaFisica);
    return PessoaFisicaMapper.toResponse(savedEntity);
  }
}