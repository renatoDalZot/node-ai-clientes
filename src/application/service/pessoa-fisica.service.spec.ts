import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { PessoaFisicaRepository } from '../../domain/repository/pessoa-fisica-repository';
import { PessoaFisicaRequest } from '../dto/pessoa-fisica.request';
import { PessoaFisica } from 'src/domain/model/pessoa-fisica.entity';


describe('PessoaFisicaService', () => {
  let service: PessoaFisicaService;
  let repository: jest.Mocked<PessoaFisicaRepository>;

  beforeEach(async () => {
    const repositoryMock: jest.Mocked<PessoaFisicaRepository> = {
      findByCpf: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaFisicaService,
        {
          provide: 'PessoaFisicaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<PessoaFisicaService>(PessoaFisicaService);
    repository = module.get('PessoaFisicaRepository');
  });

  it('deve cadastrar uma nova PessoaFisica', async () => {
    const pessoaFisicaRequest: PessoaFisicaRequest = {
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: '2000-01-01',
    };

    // Simula que não existe pessoa com o CPF
    repository.findByCpf.mockResolvedValue(null);

    // Simula a criação da pessoa
    const entity = {
      id: 1,
      nome: pessoaFisicaRequest.nome,
      cpf: pessoaFisicaRequest.cpf,
      dataNascimento: new Date(pessoaFisicaRequest.dataNascimento),
      dataCadastro: new Date('2025-01-01'),
      score: 5
    } as PessoaFisica;
    repository.create.mockResolvedValue(entity);

    const result = await service.cadastrar(pessoaFisicaRequest);

    expect(result).toBeDefined();
    expect(result.nome).toBe('Nome');
    expect(result.cpf).toBe('12345678901');
    expect(result.dataNascimento.toISOString().substring(0, 10)).toBe('2000-01-01');
    expect(result.dataCadastro).toBeDefined();

    expect(repository.findByCpf).toHaveBeenCalledWith('12345678901');    
    expect(repository.create).toHaveBeenCalled();
  });

  it('deve retornar PessoaFisicaResponse quando encontrar a entidade', async () => {
    const entity = {
      id: 1,
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: new Date('2000-01-01'),
      dataCadastro: new Date('2024-01-01'),
      score: 5
    } as PessoaFisica;

    repository.findById.mockResolvedValue(entity);

    const result = await service.findById(1);

    expect(result).toBeDefined();
    expect(result?.nome).toBe('Nome');
    expect(result?.cpf).toBe('12345678901');
    expect(result?.dataNascimento).toBeInstanceOf(Date);
    expect(result?.dataNascimento.getTime()).toBe(new Date('2000-01-01').getTime());
  });

  it('deve retornar null quando não encontrar a entidade', async () => {
    repository.findById.mockResolvedValue(null);

    const result = await service.findById(999);

    expect(result).toBeNull();
  });

  it('deve lançar erro ao tentar cadastrar uma PessoaFisica com CPF já existente', async () => {
    const pessoaFisicaRequest: PessoaFisicaRequest = {
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: '2000-01-01',
    };
    const entity = {
      id: 1,
      nome: pessoaFisicaRequest.nome,
      cpf: pessoaFisicaRequest.cpf,
      dataNascimento: new Date(pessoaFisicaRequest.dataNascimento),
      dataCadastro: new Date(),
      score: 5
    } as PessoaFisica;

    repository.findByCpf.mockResolvedValue(entity);

    await expect(service.cadastrar(pessoaFisicaRequest))
      .rejects
      .toThrow('Já existe uma pessoa física cadastrada com este CPF.');
  });
});