/*
  Warnings:

  - Made the column `embedding` on table `Chat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `embedding` on table `PaquetesEmbeddings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `embedding` on table `ProductosEmbeddings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `embedding` on table `ServiciosEmbeddings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "embedding" SET NOT NULL;

-- AlterTable
ALTER TABLE "PaquetesEmbeddings" ALTER COLUMN "embedding" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductosEmbeddings" ALTER COLUMN "embedding" SET NOT NULL;

-- AlterTable
ALTER TABLE "ServiciosEmbeddings" ALTER COLUMN "embedding" SET NOT NULL;
