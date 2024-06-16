/*
  Warnings:

  - You are about to drop the column `rol` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `ChatEmbeddings` table. All the data in the column will be lost.
  - Added the required column `role` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `ChatEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'assistant');

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "rol",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "ChatEmbeddings" DROP COLUMN "rol",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropEnum
DROP TYPE "Rol";
