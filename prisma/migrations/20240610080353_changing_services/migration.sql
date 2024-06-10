/*
  Warnings:

  - You are about to drop the column `duracion` on the `Servicios` table. All the data in the column will be lost.
  - Added the required column `duracionEnHoras` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicios" DROP COLUMN "duracion",
ADD COLUMN     "duracionEnHoras" INTEGER NOT NULL;
