/*
  Warnings:

  - You are about to drop the column `duracionenhoras` on the `Servicios` table. All the data in the column will be lost.
  - Added the required column `duracion_en_horas` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicios" DROP COLUMN "duracionenhoras",
ADD COLUMN     "duracion_en_horas" INTEGER NOT NULL;
