/*
  Warnings:

  - You are about to drop the column `embedding` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "embedding";

-- CreateTable
CREATE TABLE "ChatEmbeddings" (
    "descripcion" TEXT NOT NULL,
    "embedding" vector(500),
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "ChatEmbeddings_pkey" PRIMARY KEY ("chat_id")
);

-- AddForeignKey
ALTER TABLE "ChatEmbeddings" ADD CONSTRAINT "ChatEmbeddings_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
