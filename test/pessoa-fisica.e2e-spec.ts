import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const prisma = new PrismaClient();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await prisma.pessoaFisica.deleteMany({});
  });

  afterEach(async () => {
    await prisma.pessoaFisica.deleteMany({});
    await app.close();
  }); 


  it('POST /v1/clientes - deve cadastrar uma nova pessoa física', async () => {
    const pessoaFisica = {
      nome: 'João Teste',
      cpf: '12345678901',
      dataNascimento: '1990-01-01T00:00:00.000Z'
    };

    const response = await request(app.getHttpServer())
      .post('/v1/clientes')
      .send(pessoaFisica)
      .expect(201);

    expect(response.body.nome).toBe(pessoaFisica.nome);
    expect(response.body.cpf).toBe(pessoaFisica.cpf);
    expect(new Date(response.body.dataNascimento).toISOString()).toBe(new Date(pessoaFisica.dataNascimento).toISOString());
    expect(new Date(response.body.dataCadastro)).toBeInstanceOf(Date);
  });

  it('GET /v1/clientes/:id - deve retornar uma pessoa física por ID', async () => {
    const pessoaDiretamentePersistida = await prisma.pessoaFisica.create({
    data: {
      id: 1,
      nome: 'Maria Teste',
      cpf: '09876543210',
      dataNascimento: new Date('1995-05-05T00:00:00.000Z'),
      dataCadastro: new Date('2023-10-01T00:00:00.000Z'),
    },
  });
    
    const response = await request(app.getHttpServer())
      .get(`/v1/clientes/1`)
      .expect(200);

    expect(response.body.nome).toBe('Maria Teste');
    expect(response.body.cpf).toBe('09876543210');    
    expect(new Date(response.body.dataNascimento).toISOString()).toBe(new Date('1995-05-05T00:00:00.000Z').toISOString());
    expect(new Date(response.body.dataCadastro).toISOString()).toBe(new Date('2023-10-01T00:00:00.000Z').toISOString());
  });
});
