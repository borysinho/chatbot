/*
  Warnings:

  - The primary key for the `PaquetesEmbeddings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductosEmbeddings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ServiciosEmbeddings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PaquetesEmbeddings" DROP CONSTRAINT "PaquetesEmbeddings_pkey",
ADD COLUMN     "paqueteembedding_id" SERIAL NOT NULL,
ADD CONSTRAINT "PaquetesEmbeddings_pkey" PRIMARY KEY ("paqueteembedding_id");

-- AlterTable
ALTER TABLE "ProductosEmbeddings" DROP CONSTRAINT "ProductosEmbeddings_pkey",
ADD COLUMN     "productoembedding_id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductosEmbeddings_pkey" PRIMARY KEY ("productoembedding_id");

-- AlterTable
ALTER TABLE "ServiciosEmbeddings" DROP CONSTRAINT "ServiciosEmbeddings_pkey",
ADD COLUMN     "servicioembedding_id" SERIAL NOT NULL,
ADD CONSTRAINT "ServiciosEmbeddings_pkey" PRIMARY KEY ("servicioembedding_id");
