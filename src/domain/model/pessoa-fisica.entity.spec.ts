import { PessoaFisica } from './pessoa-fisica.entity';

describe('PessoaFisica Entity', () => {
  it('deve criar uma PessoaFisica se idade for igual ou maior que 18 anos', () => {
    const dataNascimento = new Date('2000-01-01');
    const dataCadastro = new Date('2020-01-02');
    expect(() => {
      new PessoaFisica('Nome', '12345678901', dataNascimento, dataCadastro);
    }).not.toThrow();
  });

  it('deve lançar erro se idade for menor que 18 anos', () => {
    const dataNascimento = new Date('2010-01-01');
    const dataCadastro = new Date('2020-01-01');
    expect(() => {
      new PessoaFisica('Nome', '12345678901', dataNascimento, dataCadastro);
    }).toThrow('Pessoa deve ter pelo menos 18 anos na data de cadastro.');
  });

  test.each([
    {
      nomeTeste: "Cenário para idade 18, o score inicial é 5", 
      dataCadastro: "2025-04-01T00:00:00.000Z",
      dataNascimento: "2007-04-01T00:00:00.000Z",
      expectedScore: 5
    },
    {
      nomeTeste: "Cenário para idade 33",
      dataCadastro: "2025-04-01T00:00:00.000Z", 
      dataNascimento: "1992-04-01T00:00:00.000Z",
      expectedScore: 8,
    },
    {
      nomeTeste: "Cenário para idade 48, o score não pode ser superior a 10",
      dataCadastro: "2025-04-01T00:00:00.000Z",
      dataNascimento: "1977-04-01T00:00:00.000Z",
      expectedScore: 10,
    },
    {
      nomeTeste: "Cenário para idade 55, o score deve decrementar",
      dataCadastro: "2025-04-01T00:00:00.000Z",
      dataNascimento: "1970-04-01T00:00:00.000Z",
      expectedScore: 9.5,
    },
    {
      nomeTeste: "Cenário para idade 81",
      dataCadastro: "2025-04-01T00:00:00.000Z",
      dataNascimento: "1944-04-01T00:00:00.000Z",
      expectedScore: 7
    },
    {
      nomeTeste: "Cenário para idade 105, o score não pode ser inferior a 5",
      dataCadastro: "2025-04-01T00:00:00.000Z",
      dataNascimento: "1920-04-01T00:00:00.000Z",
      expectedScore: 5
    }])('o score deve seguir as regras de negócio - $nomeTeste', ({ nomeTeste, dataCadastro, dataNascimento, expectedScore }) => {
    const dataCadastroDate = new Date(dataCadastro);
    const dataNascimentoDate = new Date(dataNascimento);
    const pessoaFisica = new PessoaFisica('Nome', '12345678901', dataNascimentoDate, dataCadastroDate);
    expect(pessoaFisica.score).toBe(expectedScore);
  });
});