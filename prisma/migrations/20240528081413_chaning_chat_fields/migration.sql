/*
  Warnings:

  - You are about to drop the column `fecha` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `ChatCliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idCliente` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remitente` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Remitente" AS ENUM ('Cliente', 'Bot');

-- DropForeignKey
ALTER TABLE "ChatCliente" DROP CONSTRAINT "ChatCliente_id_Chat_fkey";

-- DropForeignKey
ALTER TABLE "ChatCliente" DROP CONSTRAINT "ChatCliente_id_Cliente_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "fecha",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idCliente" INTEGER NOT NULL,
ADD COLUMN     "remitente" "Remitente" NOT NULL;

-- DropTable
DROP TABLE "ChatCliente";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
