import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaService } from './PessoaFisicaService';
import { PessoaFisica as PessoaFisica } from '../../domain/model/PessoaFisica';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PessoaFisicaService', () => {
  let service: PessoaFisicaService;
  let repository: Repository<PessoaFisica>;

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

  it('deve cadastrar uma nova PessoaFisica', async () => {
    // Arranjo
    const pessoaFisicaRequest = {
      nome: 'Nome',
      cpf: '12345678901',
      dataNascimento: '2000-01-01',
    };

    const entity = new PessoaFisica(
      pessoaFisicaRequest.nome,
      pessoaFisicaRequest.cpf,
      new Date(pessoaFisicaRequest.dataNascimento),
      new Date()
    );

    // Configuração do mock
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue(entity);

    // Ação
    const result = await service.cadastrarPessoaFisica(pessoaFisicaRequest);

    // Verificação
    expect(result).toBeDefined();
    expect(result?.nome).toBe('Nome');
    expect(result?.cpf).toBe('12345678901');
    expect(result?.dataNascimento).toBe('2000-01-01');
    expect(result?.dataCadastro).toBeDefined();
    expect(repository.findOne).toHaveBeenCalledWith({ where: { cpf: pessoaFisicaRequest.cpf } });
    expect(repository.save).toHaveBeenCalledWith(expect.any(PessoaFisica));
    const now = new Date();
    const resultDataCadastro = result?.dataCadastro ? new Date(result.dataCadastro) : null;
    expect(resultDataCadastro).not.toBeNull();    
    const umDiaEmMs = 24 * 60 * 60 * 1000;
    expect(Math.abs(resultDataCadastro!.getTime() - now.getTime())).toBeLessThan(umDiaEmMs);
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
    expect(result?.dataNascimento).toBe('2000-01-01');    
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
    dataNascimento: '2000-01-01',
  };
  const entity = new PessoaFisica(
    pessoaFisicaRequest.nome,
    pessoaFisicaRequest.cpf,
    new Date(pessoaFisicaRequest.dataNascimento),
    new Date()
  );
  jest.spyOn(repository, 'findOne').mockResolvedValue(entity);

  await expect(service.cadastrarPessoaFisica(pessoaFisicaRequest))
    .rejects
    .toThrow('Já existe uma pessoa física cadastrada com este CPF.');
});
  
});