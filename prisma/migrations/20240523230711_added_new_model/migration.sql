/*
  Warnings:

  - You are about to drop the `Bluetooth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConfigurableMemory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConfigurableStorage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefaultMemory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefaultStorage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Laptop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Laptop_Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model_ConfigurableMemory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model_ConfigurableStorage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wireless` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoVajilla" AS ENUM ('plato', 'vaso', 'cubiertos', 'servilleta', 'mantel', 'otro');

-- CreateEnum
CREATE TYPE "TipoBebida" AS ENUM ('jugoNatural', 'gaseosa', 'cerveza', 'vino', 'licor', 'agua', 'tekila', 'ron', 'whisky', 'otro');

-- DropForeignKey
ALTER TABLE "Laptop_Color" DROP CONSTRAINT "Laptop_Color_id_Color_fkey";

-- DropForeignKey
ALTER TABLE "Laptop_Color" DROP CONSTRAINT "Laptop_Color_id_Laptop_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_Bluetooth_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_Chip_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_DefaultMemory_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_DefaultStorage_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_Laptop_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_id_Wireless_fkey";

-- DropForeignKey
ALTER TABLE "Model_ConfigurableMemory" DROP CONSTRAINT "Model_ConfigurableMemory_id_ConfigurableMemory_fkey";

-- DropForeignKey
ALTER TABLE "Model_ConfigurableMemory" DROP CONSTRAINT "Model_ConfigurableMemory_id_Laptop_id_Chip_id_DefaultMemor_fkey";

-- DropForeignKey
ALTER TABLE "Model_ConfigurableStorage" DROP CONSTRAINT "Model_ConfigurableStorage_id_ConfigurableStorage_fkey";

-- DropForeignKey
ALTER TABLE "Model_ConfigurableStorage" DROP CONSTRAINT "Model_ConfigurableStorage_id_Laptop_id_Chip_id_DefaultMemo_fkey";

-- DropTable
DROP TABLE "Bluetooth";

-- DropTable
DROP TABLE "Chip";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "ConfigurableMemory";

-- DropTable
DROP TABLE "ConfigurableStorage";

-- DropTable
DROP TABLE "DefaultMemory";

-- DropTable
DROP TABLE "DefaultStorage";

-- DropTable
DROP TABLE "Laptop";

-- DropTable
DROP TABLE "Laptop_Color";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "Model_ConfigurableMemory";

-- DropTable
DROP TABLE "Model_ConfigurableStorage";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Wireless";

-- DropEnum
DROP TYPE "StorageType";

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" INTEGER,
    "email" TEXT,
    "direccion" TEXT NOT NULL,
    "whatsappNumber" INTEGER NOT NULL,
    "profileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "montoTotalBS" DOUBLE PRECISION NOT NULL,
    "descuentoBS" DOUBLE PRECISION NOT NULL,
    "montoGarantiaBS" DOUBLE PRECISION NOT NULL,
    "notas" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_Cliente" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComboCotizacion" (
    "id" SERIAL NOT NULL,
    "nombreCombo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_Cotizacion" INTEGER NOT NULL,

    CONSTRAINT "ComboCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatCliente" (
    "id_Cliente" INTEGER NOT NULL,
    "id_Chat" INTEGER NOT NULL,

    CONSTRAINT "ChatCliente_pkey" PRIMARY KEY ("id_Cliente","id_Chat")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "fechaLimitePago" TIMESTAMP(3) NOT NULL,
    "fechaEvento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagos" (
    "id_Cotizacion" INTEGER NOT NULL,
    "id_Reserva" INTEGER NOT NULL,

    CONSTRAINT "Pagos_pkey" PRIMARY KEY ("id_Cotizacion","id_Reserva")
);

-- CreateTable
CREATE TABLE "ImagenesSalon" (
    "id" SERIAL NOT NULL,
    "imagen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_Salon" INTEGER NOT NULL,

    CONSTRAINT "ImagenesSalon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmbientesSalon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_Salon" INTEGER NOT NULL,

    CONSTRAINT "AmbientesSalon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "costoDia" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion_Salon" (
    "id_Cotizacion" INTEGER NOT NULL,
    "id_Salon" INTEGER NOT NULL,
    "detalle" TEXT NOT NULL,

    CONSTRAINT "Cotizacion_Salon_pkey" PRIMARY KEY ("id_Cotizacion","id_Salon")
);

-- CreateTable
CREATE TABLE "Vajilla" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoVajilla" NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vajilla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion_Vajilla" (
    "id" SERIAL NOT NULL,
    "id_Cotizacion" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "id_Vajilla" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_Vajilla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion_Bebidas" (
    "id" SERIAL NOT NULL,
    "id_Cotizacion" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "horaAServir" TIMESTAMP(3) NOT NULL,
    "id_Bebidas" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_Bebidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bebidas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoBebida" NOT NULL,

    CONSTRAINT "Bebidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fotografia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Fotografia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion_Fotografia" (
    "id" SERIAL NOT NULL,
    "id_Cotizacion" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "horaAServir" TIMESTAMP(3) NOT NULL,
    "id_Fotografia" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_Fotografia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenesTransporte" (
    "id" SERIAL NOT NULL,
    "imagen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_Transporte" INTEGER NOT NULL,

    CONSTRAINT "ImagenesTransporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporte" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "costoHora" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion_Transporte" (
    "id" SERIAL NOT NULL,
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "nroCelularRef" INTEGER NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFin" TIMESTAMP(3) NOT NULL,
    "id_Transporte" INTEGER NOT NULL,
    "id_Cotizacion" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_Transporte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_id_Cliente_fkey" FOREIGN KEY ("id_Cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboCotizacion" ADD CONSTRAINT "ComboCotizacion_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatCliente" ADD CONSTRAINT "ChatCliente_id_Cliente_fkey" FOREIGN KEY ("id_Cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatCliente" ADD CONSTRAINT "ChatCliente_id_Chat_fkey" FOREIGN KEY ("id_Chat") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagos" ADD CONSTRAINT "Pagos_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagos" ADD CONSTRAINT "Pagos_id_Reserva_fkey" FOREIGN KEY ("id_Reserva") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenesSalon" ADD CONSTRAINT "ImagenesSalon_id_Salon_fkey" FOREIGN KEY ("id_Salon") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmbientesSalon" ADD CONSTRAINT "AmbientesSalon_id_Salon_fkey" FOREIGN KEY ("id_Salon") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Salon" ADD CONSTRAINT "Cotizacion_Salon_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Salon" ADD CONSTRAINT "Cotizacion_Salon_id_Salon_fkey" FOREIGN KEY ("id_Salon") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Vajilla" ADD CONSTRAINT "Cotizacion_Vajilla_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Vajilla" ADD CONSTRAINT "Cotizacion_Vajilla_id_Vajilla_fkey" FOREIGN KEY ("id_Vajilla") REFERENCES "Vajilla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Bebidas" ADD CONSTRAINT "Cotizacion_Bebidas_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Bebidas" ADD CONSTRAINT "Cotizacion_Bebidas_id_Bebidas_fkey" FOREIGN KEY ("id_Bebidas") REFERENCES "Bebidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Fotografia" ADD CONSTRAINT "Cotizacion_Fotografia_id_Cotizacion_fkey" FOREIGN KEY ("id_Cotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Fotografia" ADD CONSTRAINT "Cotizacion_Fotografia_id_Fotografia_fkey" FOREIGN KEY ("id_Fotografia") REFERENCES "Fotografia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenesTransporte" ADD CONSTRAINT "ImagenesTransporte_id_Transporte_fkey" FOREIGN KEY ("id_Transporte") REFERENCES "Transporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion_Transporte" ADD CONSTRAINT "Cotizacion_Transporte_id_Transporte_fkey" FOREIGN KEY ("id_Transporte") REFERENCES "Transporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
