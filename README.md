#Clientes API

API RESTful para cadastro, consulta e gerenciamento de pessoas físicas, construída com NestJS, TypeScript e Prisma ORM.

## Índice

- [Funcionalidades](#funcionalidades)
- [Estrutura](#estrutura)
- [Endpoints](#endpoints)
- [Regras de Negócio](#regras-de-negócio)
- [Tecnologias](#tecnologias)
- [Como rodar](#como-rodar)
- [Testes](#testes)
- [Observações](#observações)
- [Especificações Nest](#especificações-nest)

***

## Funcionalidades

- Cadastro de pessoas físicas
- Consulta de pessoa física por ID ou CPF
- Validação de dados e regras de negócio (ex: idade mínima)
- Cobertura de testes unitários e e2e

***

## Estrutura

```bash
src/
 ├── application/
 │    ├── dto/                # DTOs de request/response
 │    ├── mapper/             # Mapeamento entre entidades e DTOs
 │    └── service/            # Serviços de aplicação
 ├── controller/              # Controllers HTTP (rotas)
 ├── domain/
 │    ├── model/              # Entidades de domínio
 │    └── repository/         # Interfaces de repositório
 ├── infra/
 │    └── prisma/             # Implementação de repositório com Prisma
 ├── app.controller.ts
 ├── app.module.ts
 └── app.service.ts
test/                         # Testes e2e
```

***

## Endpoints

**Cadastro de Pessoa Física**

- POST /v1/clientes

**Body:**
```json
{
  "nome": "João da Silva",
  "cpf": "12345678901",
  "dataNascimento": "1990-01-01",
  "dataCadastro": "2023-01-01"
}
```

**Resposta:**
- 201 Created
- 400 Bad Request

***

**Consulta de Pessoa Física por ID**

- GET /v1/clientes/:id

**Resposta:**
- 200 OK
- 404 Not Found

***

**Consulta de pessoa por CPF**

 - GET /v1/clientes/cpf/:cpf

**Resposta:**
- 200 OK
- 404 Not Found

***

## Regras de Negócio

- **Idade mínima:** 18 anos na data de cadastro
- **Score:** Calculado automaticamente conforme idade (ver lógica em [PessoaFisica](src\domain\model\pessoa-fisica.entity.ts))

***

## Tecnologias

- [NestJS](https://nestjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Prisma ORM](https://www.prisma.io)
- [Jest](https://jestjs.io)
- [Moment.js](https://momentjs.com)

***

## Como rodar

1. Instale as dependências:
```bash
$ npm install
```

2. Configure o banco de dados no Prisma (exemplo: SQLite, PostgreSQL).
3. Rode as migrations do Prisma:
```bash
npx prisma migrate dev
```
4. Inicie a API:
```bash
$ npm run start
```
5. Acesse em (http://localhost:3000)

***

## Testes

- Unitários e e2e com jest:
```bash
$ npm run test
$ npm run test:e2e
```

***

## Observações

- Pendente: não corrigimos a forma como utilizar o prisma com o banco SQLite em ambiente de teste e com Postgres em ambiente de produção.
- Pendente: as demais funcionalidades do projeto (endereço, pessoa jurídica etc.)
- O projeto segue princípios de Clean Architecture (camadas bem definidas).
- Para customizações, consulte os DTOs, entidades e serviços em application e domain.

***

# Especificações Nest
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Logo Nest" /></a>
</p>

<p align="center">Um framework progressivo do <a href="http://nodejs.org" target="_blank">Node.js</a> para construção de aplicações servidoras eficientes e escaláveis.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Versão NPM" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Licença do Pacote" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads NPM" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Apoiadores no Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Patrocinadores no Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Doar-PayPal-ff3f59.svg" alt="Doe para nós"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Apoie%20nós-Open%20Collective-41B883.svg" alt="Apoie-nos"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Seguir" alt="Siga-nos no Twitter"></a>
</p>

## Descrição

Repositório inicial do framework [Nest](https://github.com/nestjs/nest) com TypeScript.

## Configuração do Projeto

```bash
$ npm install
```

## Compilar e executar o projeto

```bash
# desenvolvimento
$ npm run start

# modo observação (watch)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## Executar testes

```bash
# testes unitários
$ npm run test

# testes de ponta a ponta (e2e)
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Deploy

Quando estiver pronto para colocar sua aplicação NestJS em produção, existem alguns passos importantes que podem garantir o melhor desempenho possível. Confira a [documentação de deploy](https://docs.nestjs.com/deployment) para mais informações.

Se você busca uma plataforma baseada em nuvem para implantar sua aplicação NestJS, veja o [Mau](https://mau.nestjs.com), nossa plataforma oficial para deploy de aplicações NestJS na AWS. O Mau facilita o deploy com apenas alguns passos simples:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Com o Mau, você pode implantar sua aplicação com apenas alguns cliques, permitindo que você foque no desenvolvimento de funcionalidades em vez de infraestrutura.

## Recursos

Veja alguns recursos que podem ser úteis ao trabalhar com NestJS:

- Visite a [Documentação do NestJS](https://docs.nestjs.com) para aprender mais sobre o framework.
- Para dúvidas e suporte, participe do nosso [canal no Discord](https://discord.gg/G7Qnnhy).
- Para se aprofundar com experiências práticas, veja nossos [cursos oficiais](https://courses.nestjs.com/).
- Faça deploy para a AWS com o [NestJS Mau](https://mau.nestjs.com) em apenas alguns cliques.
- Visualize o grafo da sua aplicação e interaja com o NestJS em tempo real usando o [NestJS Devtools](https://devtools.nestjs.com).
- Precisa de ajuda com seu projeto (meio período ou integral)? Confira nosso [suporte empresarial](https://enterprise.nestjs.com).
- Para novidades e atualizações, siga-nos no [X](https://x.com/nestframework) e [LinkedIn](https://linkedin.com/company/nestjs).
- Está buscando trabalho ou quer contratar? Veja nosso [quadro oficial de vagas](https://jobs.nestjs.com).

## Apoio

Nest é um projeto open source licenciado sob MIT. Ele cresce graças aos patrocinadores e ao apoio dos incríveis apoiadores. Se quiser se juntar a eles, [clique aqui para saber mais](https://docs.nestjs.com/support).

## Mantenha contato

- Autor - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

Nest possui licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
