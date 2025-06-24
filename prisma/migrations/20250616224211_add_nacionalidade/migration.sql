/*
  Warnings:

  - Added the required column `nacionalidade` to the `PessoaFisica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PessoaFisica" ADD COLUMN     "nacionalidade" TEXT NOT NULL;
