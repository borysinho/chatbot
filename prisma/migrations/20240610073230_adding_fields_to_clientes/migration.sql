/*
  Warnings:

  - A unique constraint covering the columns `[whatsappNumber]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileName` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsappNumber` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN     "profileName" TEXT NOT NULL,
ADD COLUMN     "whatsappNumber" TEXT NOT NULL,
ALTER COLUMN "nombre" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_whatsappNumber_key" ON "Clientes"("whatsappNumber");
