-- CreateTable
CREATE TABLE "ProductosEmbeddings" (
    "producto_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "embedding" vector(1436) NOT NULL,

    CONSTRAINT "ProductosEmbeddings_pkey" PRIMARY KEY ("producto_id")
);

-- AddForeignKey
ALTER TABLE "ProductosEmbeddings" ADD CONSTRAINT "ProductosEmbeddings_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Productos"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
