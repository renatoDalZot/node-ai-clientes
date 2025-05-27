import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaFisicaService } from './application/service/PessoaFisicaService';
import { PessoaFisicaController } from './application/controller/PessoaFisicaController';
import { PessoaFisicaEntity } from './domain/model/PessoaFisicaEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db', 
      entities: [PessoaFisicaEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PessoaFisicaEntity]), 
  ],
  controllers: [AppController, PessoaFisicaController],
  providers: [AppService, PessoaFisicaService],
})
export class AppModule {}
