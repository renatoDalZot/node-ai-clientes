import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaService } from './PessoaFisicaService';
import { PessoaFisica as PessoaFisica } from '../../domain/model/PessoaFisica';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaFisicaRequest } from '../dto/PessoaFisicaRequest';

describe('PessoaFisicaService', () => {
  let service: PessoaFisicaService;
  let repository: Repository<PessoaFisica>;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01'));
  });
    

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaFisicaService,
        {
          provide: getRepositoryToken(PessoaFisica),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PessoaFisicaService>(PessoaFisicaService);
    repository = module.get<Repository<PessoaFisica>>(getRepositoryToken(PessoaFisica));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('deve cadastrar uma nova PessoaFisica', async () => {
    // Arranjo
    const pessoaFisicaRequest = {
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: new Date('2000-01-01'),
    } as PessoaFisicaRequest;

    const entity = new PessoaFisica(
      pessoaFisicaRequest.nome,
      pessoaFisicaRequest.cpf,
      pessoaFisicaRequest.dataNascimento,
      new Date()
    );

    // Configuração do mock
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue(entity);    

    // Ação
    const result = await service.cadastrarPessoaFisica(pessoaFisicaRequest);

    // Verificação
    expect(result).toBeDefined();
    expect(result.nome).toBe('Nome');
    expect(result.cpf).toBe('12345678901');    
    expect(result.dataNascimento.toISOString().substring(0, 10)).toBe('2000-01-01');    
    expect(result.dataCadastro.toISOString().substring(0, 10)).toBe('2025-01-01');   

    expect(repository.findOne).toHaveBeenCalledWith({ where: { cpf: pessoaFisicaRequest.cpf } });
    expect(repository.save).toHaveBeenCalledWith(expect.any(PessoaFisica));       
  });

  it('deve retornar PessoaFisicaResponse quando encontrar a entidade', async () => {
    // Arranjo
    const entity = new PessoaFisica('Nome', '12345678901', new Date('2000-01-01'), new Date('2024-01-01'));
    entity.id = 1;

    //Configuração do mock	
    jest.spyOn(repository, 'findOne').mockResolvedValue(entity);

    // Ação
    const result = await service.findById(1);

    // Verificação
    expect(result).toBeDefined();
    expect(result?.nome).toBe('Nome');
    expect(result?.cpf).toBe('12345678901');
    expect(result?.dataNascimento).toBeInstanceOf(Date);
    expect(result?.dataNascimento.getTime()).toBe(new Date('2000-01-01').getTime());
  });

  it('deve retornar null quando não encontrar a entidade', async () => {
    // Configuração do mock
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    // Ação
    const result = await service.findById(999);

    // Verificação
    expect(result).toBeNull();
  });

  it('deve lançar erro ao tentar cadastrar uma PessoaFisica com CPF já existente', async () => {
    const pessoaFisicaRequest = {
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: new Date('2000-01-01'),
    };
    const entity = new PessoaFisica(
      pessoaFisicaRequest.nome,
      pessoaFisicaRequest.cpf,
      pessoaFisicaRequest.dataNascimento,
      new Date()
    );
    jest.spyOn(repository, 'findOne').mockResolvedValue(entity);

    await expect(service.cadastrarPessoaFisica(pessoaFisicaRequest))
      .rejects
      .toThrow('Já existe uma pessoa física cadastrada com este CPF.');
  });
  
});