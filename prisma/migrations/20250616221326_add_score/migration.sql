/*
  Warnings:

  - Added the required column `score` to the `PessoaFisica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PessoaFisica" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;
