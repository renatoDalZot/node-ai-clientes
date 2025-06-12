import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaFisicaService } from './application/service/pessoa-fisica.service';
import { PessoaFisicaController } from './controller/pessoa-fisica.controller';
import { PessoaFisicaPrismaRepository } from './infra/prisma/pessoa-fisica.prisma.repository';
import { PrismaService } from './application/service/prisma.service';


@Module({
  controllers: [AppController, PessoaFisicaController],
  providers: [
    AppService, 
    PessoaFisicaService, 
    PrismaService,
    {
      provide: 'PessoaFisicaRepository',
      useClass: PessoaFisicaPrismaRepository,
    },
  ],
})
export class AppModule {}
