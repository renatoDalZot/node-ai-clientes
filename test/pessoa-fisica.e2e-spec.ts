import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PessoaFisica, PrismaClient } from '@prisma/client';
import { PessoaFisicaRequest } from 'src/application/dto/pessoa-fisica.request';

describe('PessoaFisicaController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {    
    await prisma.pessoaFisica.deleteMany();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('POST /v1/clientes - deve cadastrar uma nova pessoa física', async () => {
    const pessoaFisica = {
      nome: 'João Teste',
      cpf: '12345678901',
      dataNascimento: '1990-01-01T00:00:00.000Z'
    } as PessoaFisicaRequest;

    const response = await request(app.getHttpServer())
      .post('/v1/clientes')
      .send(pessoaFisica);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(pessoaFisica.nome);
    expect(response.body.cpf).toBe(pessoaFisica.cpf);
    expect(new Date(response.body.dataNascimento).toISOString()).toBe(new Date(pessoaFisica.dataNascimento).toISOString());
    expect(new Date(response.body.dataCadastro)).toBeInstanceOf(Date);
  });

  it('GET /v1/clientes/:id - deve retornar uma pessoa física por ID', async () => {    
    const pessoaCriada = await prisma.pessoaFisica.create({
      data: {
        nome: 'Maria Teste',
        cpf: '98765432100',
        dataNascimento: new Date('1995-05-05T00:00:00.000Z'),
        dataCadastro: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/v1/clientes/${pessoaCriada.id}`)
      .expect(200);
    
    expect(response.body.nome).toBe('Maria Teste');
    expect(response.body.cpf).toBe('98765432100');
    expect(response.body.dataNascimento).toBe('1995-05-05T00:00:00.000Z');
    expect(response.body.dataCadastro).toBeDefined();
  });
});
