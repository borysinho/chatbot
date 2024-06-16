/*
  Warnings:

  - Added the required column `cliente_id` to the `ChatEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatEmbeddings" ADD COLUMN     "cliente_id" INTEGER NOT NULL;
