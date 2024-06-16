/*
  Warnings:

  - You are about to drop the column `role` on the `ChatEmbeddings` table. All the data in the column will be lost.
  - Changed the type of `role` on the `Chat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `rol` to the `ChatEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('user', 'assistant');

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "role",
ADD COLUMN     "role" "Rol" NOT NULL;

-- AlterTable
ALTER TABLE "ChatEmbeddings" DROP COLUMN "role",
ADD COLUMN     "rol" "Rol" NOT NULL;

-- DropEnum
DROP TYPE "Role";
