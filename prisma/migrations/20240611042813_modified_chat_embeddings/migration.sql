/*
  Warnings:

  - You are about to drop the `ChatEmbeddings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatEmbeddings" DROP CONSTRAINT "ChatEmbeddings_chat_id_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "embedding" vector(500);

-- DropTable
DROP TABLE "ChatEmbeddings";
