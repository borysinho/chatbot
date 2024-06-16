/*
  Warnings:

  - You are about to drop the `PaquetesEmbeddings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductosEmbeddings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiciosEmbeddings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaquetesEmbeddings" DROP CONSTRAINT "PaquetesEmbeddings_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductosEmbeddings" DROP CONSTRAINT "ProductosEmbeddings_producto_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiciosEmbeddings" DROP CONSTRAINT "ServiciosEmbeddings_servicio_id_fkey";

-- DropTable
DROP TABLE "PaquetesEmbeddings";

-- DropTable
DROP TABLE "ProductosEmbeddings";

-- DropTable
DROP TABLE "ServiciosEmbeddings";

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "ref_id" INTEGER NOT NULL,
    "clase" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "embedding" vector(500),

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);
