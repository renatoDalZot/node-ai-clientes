import * as moment from "moment";

export class PessoaFisica {
  private static readonly IDADE_MINIMA_PERMITIDA = 18;
  private static readonly IDADE_DECLINIO = 50;
  private static readonly SCORE_INICIAL = 5;
  private static readonly SCORE_MAXIMO = 10;
  private static readonly CICLO_QUINQUENAL = 5;
  private static readonly INCREMENTO =1;
  private static readonly DECREMENTO = 0.5;

  id: number;
   nome: string;
   cpf: string;
   dataNascimento: Date;
   dataCadastro: Date;    
   score: number;    

  constructor(    
    nome: string,
    cpf: string,
    dataNascimento: Date,
    dataCadastro: Date  // TODO: criação do campo aqui...
  ) {  
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.dataCadastro = dataCadastro;  
    const idade = this.calcularIdade();
    if (idade < PessoaFisica.IDADE_MINIMA_PERMITIDA) {
      throw new Error('Pessoa deve ter pelo menos 18 anos na data de cadastro.');
    }
    this.score = this.calcularScore(idade);
  }

  get getNome(): string {
    return this.nome;
  }

  get getCpf(): string {
    return this.cpf;
  }

  get getDataNascimento(): Date {
    return this.dataNascimento;
  }

  get getDataCadastro(): Date {
    return this.dataCadastro;
  }

  get getScore(): number {
    return this.score;
  }
   

  private calcularIdade(): number {
    const dataInicial = moment(this.dataNascimento);
    const dataFinal = moment(this.dataCadastro);
    console.log('idade', dataFinal.diff(dataInicial, 'years'));
    return dataFinal.diff(dataInicial, 'years');
  }

  private calcularScore(idade: number): number {
    let anosPos18 = idade - PessoaFisica.IDADE_MINIMA_PERMITIDA;
    let anosPos50 = idade - PessoaFisica.IDADE_DECLINIO;
    let score = (idade < PessoaFisica.IDADE_DECLINIO) ? 
      PessoaFisica.SCORE_INICIAL + Math.floor(anosPos18 / PessoaFisica.CICLO_QUINQUENAL) * PessoaFisica.INCREMENTO :
      PessoaFisica.SCORE_MAXIMO - Math.floor(anosPos50 / PessoaFisica.CICLO_QUINQUENAL) * PessoaFisica.DECREMENTO;
    if (score < PessoaFisica.SCORE_INICIAL) score = PessoaFisica.SCORE_INICIAL;
    if (score > PessoaFisica.SCORE_MAXIMO) score = PessoaFisica.SCORE_MAXIMO;
    return score;   
  }
}