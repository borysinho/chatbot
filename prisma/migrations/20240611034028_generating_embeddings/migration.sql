/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_pkey",
DROP COLUMN "id",
ADD COLUMN     "chat_id" SERIAL NOT NULL,
ADD CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id");

-- CreateTable
CREATE TABLE "ServiciosEmbeddings" (
    "servicio_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "embedding" vector(500),

    CONSTRAINT "ServiciosEmbeddings_pkey" PRIMARY KEY ("servicio_id")
);

-- CreateTable
CREATE TABLE "PaquetesEmbeddings" (
    "paquete_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "embedding" vector(500),

    CONSTRAINT "PaquetesEmbeddings_pkey" PRIMARY KEY ("paquete_id")
);

-- CreateTable
CREATE TABLE "ChatEmbeddings" (
    "chat_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "embedding" vector(500),

    CONSTRAINT "ChatEmbeddings_pkey" PRIMARY KEY ("chat_id")
);

-- AddForeignKey
ALTER TABLE "ServiciosEmbeddings" ADD CONSTRAINT "ServiciosEmbeddings_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "Servicios"("servicio_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaquetesEmbeddings" ADD CONSTRAINT "PaquetesEmbeddings_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "Paquetes"("paquete_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatEmbeddings" ADD CONSTRAINT "ChatEmbeddings_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
