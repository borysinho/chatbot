/*
  Warnings:

  - You are about to drop the column `duracionEnHoras` on the `Servicios` table. All the data in the column will be lost.
  - Added the required column `duracionenhoras` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicios" DROP COLUMN "duracionEnHoras",
ADD COLUMN     "duracionenhoras" INTEGER NOT NULL;
