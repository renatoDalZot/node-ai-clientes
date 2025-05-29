import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pessoa_fisica' })
export class PessoaFisica {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 100 })
    nome: string;
    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;
    @Column({ type: 'date' })
    dataNascimento: Date;
    @Column({ type: 'date' })
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