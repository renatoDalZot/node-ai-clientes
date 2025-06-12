export class PessoaFisica {

    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    dataCadastro: Date;  

  constructor(    
    nome: string,
    cpf: string,
    dataNascimento: Date,
    dataCadastro: Date
  ) {    
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.dataCadastro = dataCadastro;
  }
}