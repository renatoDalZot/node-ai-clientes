import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaFisicaService } from './application/service/PessoaFisicaService';
import { PessoaFisicaController } from './application/controller/PessoaFisicaController';
import { PessoaFisica as PessoaFisica } from './domain/model/PessoaFisica';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db', 
      entities: [PessoaFisica],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PessoaFisica]), 
  ],
  controllers: [AppController, PessoaFisicaController],
  providers: [AppService, PessoaFisicaService],
})
export class AppModule {}
