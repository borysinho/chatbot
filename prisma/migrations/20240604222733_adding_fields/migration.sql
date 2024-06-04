/*
  Warnings:

  - You are about to drop the `ProductosEmbeddings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductosEmbeddings" DROP CONSTRAINT "ProductosEmbeddings_idProducto_fkey";

-- DropTable
DROP TABLE "ProductosEmbeddings";

-- CreateTable
CREATE TABLE "Embeddings" (
    "idProductoEmbedding" SERIAL NOT NULL,
    "NombreProducto" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Embedding" vector(3) NOT NULL,
    "idProducto" INTEGER,
    "idJuegoDeProductos" INTEGER,

    CONSTRAINT "Embeddings_pkey" PRIMARY KEY ("idProductoEmbedding")
);

-- AddForeignKey
ALTER TABLE "Embeddings" ADD CONSTRAINT "Embeddings_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embeddings" ADD CONSTRAINT "Embeddings_idJuegoDeProductos_fkey" FOREIGN KEY ("idJuegoDeProductos") REFERENCES "JuegoDeProductos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
