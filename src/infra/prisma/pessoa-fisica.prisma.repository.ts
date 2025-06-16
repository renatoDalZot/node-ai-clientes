import { Injectable } from '@nestjs/common';
import { PessoaFisica as PessoaFisicaPrisma } from '@prisma/client';
import { PessoaFisicaRepository } from '../../domain/repository/pessoa-fisica-repository';
import { PrismaService } from '../../application/service/prisma.service';
import { PessoaFisica } from '../../domain/model/pessoa-fisica.entity';

@Injectable()
export class PessoaFisicaPrismaRepository implements PessoaFisicaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<PessoaFisica | null> {
    const pessoaFisicaPrisma = await this.prisma.pessoaFisica.findUnique({ where: { cpf } });
    return PessoaFisicaPrismaRepository.toEntity(pessoaFisicaPrisma);
  }

  async findById(id: number): Promise<PessoaFisica | null> {
    const pessoaFisicaPrisma = await this.prisma.pessoaFisica.findUnique({ where: { id } });    
    return PessoaFisicaPrismaRepository.toEntity(pessoaFisicaPrisma);
  }

  async create(data: Omit<PessoaFisica, 'id'>): Promise<PessoaFisica> {
    const pessoaFisicaPrisma = await this.prisma.pessoaFisica.create({
      data,
    });
    return PessoaFisicaPrismaRepository.toEntity(pessoaFisicaPrisma) as PessoaFisica;
  }

  private static toEntity(pessoaFisicaPrisma: PessoaFisicaPrisma | null): PessoaFisica | null {
    if (!pessoaFisicaPrisma) {
      return null;
    }
    return new PessoaFisica(
      pessoaFisicaPrisma.nome,
      pessoaFisicaPrisma.cpf,
      pessoaFisicaPrisma.dataNascimento,
      pessoaFisicaPrisma.dataCadastro
    );
  }
}