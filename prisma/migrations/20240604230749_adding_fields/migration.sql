/*
  Warnings:

  - Added the required column `cantidad` to the `DetalleJuegoDeProductos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `juegoCompleto` to the `DetalleJuegoDeProductos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `DetalleJuegoDeProductos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleJuegoDeProductos" ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "juegoCompleto" BOOLEAN NOT NULL,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;
