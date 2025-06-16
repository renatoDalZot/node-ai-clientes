import { Injectable } from '@nestjs/common';
import { PessoaFisica } from '@prisma/client';
import { PessoaFisicaRepository } from '../../domain/repository/pessoa-fisica-repository';
import { PrismaService } from '../../application/service/prisma.service';

@Injectable()
export class PessoaFisicaPrismaRepository implements PessoaFisicaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<PessoaFisica | null> {
    return this.prisma.pessoaFisica.findUnique({ where: { cpf } });
  }

  async findById(id: number): Promise<PessoaFisica | null> {
    return this.prisma.pessoaFisica.findUnique({ where: { id } });
  }

  async create(data: Omit<PessoaFisica, 'id'>): Promise<PessoaFisica> {
    return this.prisma.pessoaFisica.create({
      data,
    });
  }
}