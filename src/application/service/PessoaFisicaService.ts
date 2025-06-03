import { Injectable } from '@nestjs/common';
import { PessoaFisica as PessoaFisica } from '../../domain/model/PessoaFisica';
import { PessoaFisicaRequest } from '../dto/PessoaFisicaRequest';
import { PessoaFisicaResponse } from '../dto/PessoaFisicaResponse';
import { PessoaFisicaMapper } from '../mapper/PessoaFisicaMapper';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PessoaFisicaService {
  private prisma = new PrismaClient();

  async findById(id: number): Promise<PessoaFisicaResponse | null> {
    const entity = await this.prisma.pessoaFisica.findUnique({ where: { id } });        
    if (!entity) return null; 
    return PessoaFisicaMapper.toResponse(entity);
  }

  async cadastrarPessoaFisica(pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisicaResponse>  {        
    const existingPessoa = await this.prisma.pessoaFisica.findUnique({
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
    
    const savedEntity = await this.prisma.pessoaFisica.create({
      data: {
        nome: novaPessoaFisica.nome,
        cpf: novaPessoaFisica.cpf,
        dataNascimento: novaPessoaFisica.dataNascimento,
        dataCadastro: novaPessoaFisica.dataCadastro,
      },
    });
    if (!savedEntity) {
      throw new Error('Erro ao cadastrar a pessoa física.');
    }
    return PessoaFisicaMapper.toResponse(savedEntity);
  }
}