/*
  Warnings:

  - You are about to drop the column `esServicio` on the `Productos` table. All the data in the column will be lost.
  - You are about to drop the column `seVende` on the `Productos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Productos" DROP COLUMN "esServicio",
DROP COLUMN "seVende",
ADD COLUMN     "seVendeComoProducto" BOOLEAN NOT NULL DEFAULT false;
