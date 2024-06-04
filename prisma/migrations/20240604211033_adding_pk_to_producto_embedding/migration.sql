/*
  Warnings:

  - The primary key for the `ProductosEmbeddings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `idProductoEmbedding` to the `ProductosEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductosEmbeddings" DROP CONSTRAINT "ProductosEmbeddings_pkey",
ADD COLUMN     "idProductoEmbedding" INTEGER NOT NULL,
ADD CONSTRAINT "ProductosEmbeddings_pkey" PRIMARY KEY ("idProductoEmbedding");
