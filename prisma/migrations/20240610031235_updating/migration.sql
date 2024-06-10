/*
  Warnings:

  - You are about to drop the `Caracteristicas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contrato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cotizacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleDeCategoriaDeProductos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleJuegoDeProductos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleJuegoDeProductosContratados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleJuegoDeProductosCotizados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleProductosIndividualesContratados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleProductosIndividualesCotizados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmbeddingsProductos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagenProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JuegoDeProductos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Productos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockPorFecha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnidadDeMedida` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "pendienteaprobadarechazada_enum" AS ENUM ('Pendiente', 'Aprobada', 'Rechazada');

-- CreateEnum
CREATE TYPE "pendienteconfirmadacancelada_enum" AS ENUM ('Pendiente', 'Confirmada', 'Cancelada');

-- CreateEnum
CREATE TYPE "pendienteenprocesocompletadacancelada_enum" AS ENUM ('Pendiente', 'En Proceso', 'Completada', 'Cancelada');

-- CreateEnum
CREATE TYPE "productoservicio_enum" AS ENUM ('Producto', 'Servicio');

-- CreateEnum
CREATE TYPE "productoserviciopaquete_enum" AS ENUM ('Producto', 'Servicio', 'Paquete');

-- DropForeignKey
ALTER TABLE "Caracteristicas" DROP CONSTRAINT "Caracteristicas_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Cotizacion" DROP CONSTRAINT "Cotizacion_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "DetalleDeCategoriaDeProductos" DROP CONSTRAINT "DetalleDeCategoriaDeProductos_idCategoria_fkey";

-- DropForeignKey
ALTER TABLE "DetalleDeCategoriaDeProductos" DROP CONSTRAINT "DetalleDeCategoriaDeProductos_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductos" DROP CONSTRAINT "DetalleJuegoDeProductos_idJuegoDeProductos_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductos" DROP CONSTRAINT "DetalleJuegoDeProductos_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductosContratados" DROP CONSTRAINT "DetalleJuegoDeProductosContratados_idContrato_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductosContratados" DROP CONSTRAINT "DetalleJuegoDeProductosContratados_idProducto_idJuegoDePro_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductosCotizados" DROP CONSTRAINT "DetalleJuegoDeProductosCotizados_idCotizacion_fkey";

-- DropForeignKey
ALTER TABLE "DetalleJuegoDeProductosCotizados" DROP CONSTRAINT "DetalleJuegoDeProductosCotizados_idProducto_idJuegoDeProdu_fkey";

-- DropForeignKey
ALTER TABLE "DetalleProductosIndividualesContratados" DROP CONSTRAINT "DetalleProductosIndividualesContratados_idContrato_fkey";

-- DropForeignKey
ALTER TABLE "DetalleProductosIndividualesContratados" DROP CONSTRAINT "DetalleProductosIndividualesContratados_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "DetalleProductosIndividualesCotizados" DROP CONSTRAINT "DetalleProductosIndividualesCotizados_idCotizacion_fkey";

-- DropForeignKey
ALTER TABLE "DetalleProductosIndividualesCotizados" DROP CONSTRAINT "DetalleProductosIndividualesCotizados_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "EmbeddingsProductos" DROP CONSTRAINT "EmbeddingsProductos_idJuegoDeProductos_fkey";

-- DropForeignKey
ALTER TABLE "EmbeddingsProductos" DROP CONSTRAINT "EmbeddingsProductos_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "ImagenProducto" DROP CONSTRAINT "ImagenProducto_idProducto_fkey";

-- DropForeignKey
ALTER TABLE "Productos" DROP CONSTRAINT "Productos_idUnidadDeMedida_fkey";

-- DropForeignKey
ALTER TABLE "StockPorFecha" DROP CONSTRAINT "StockPorFecha_idProducto_fkey";

-- DropTable
DROP TABLE "Caracteristicas";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Contrato";

-- DropTable
DROP TABLE "Cotizacion";

-- DropTable
DROP TABLE "DetalleDeCategoriaDeProductos";

-- DropTable
DROP TABLE "DetalleJuegoDeProductos";

-- DropTable
DROP TABLE "DetalleJuegoDeProductosContratados";

-- DropTable
DROP TABLE "DetalleJuegoDeProductosCotizados";

-- DropTable
DROP TABLE "DetalleProductosIndividualesContratados";

-- DropTable
DROP TABLE "DetalleProductosIndividualesCotizados";

-- DropTable
DROP TABLE "EmbeddingsProductos";

-- DropTable
DROP TABLE "ImagenProducto";

-- DropTable
DROP TABLE "JuegoDeProductos";

-- DropTable
DROP TABLE "Productos";

-- DropTable
DROP TABLE "StockPorFecha";

-- DropTable
DROP TABLE "UnidadDeMedida";

-- DropEnum
DROP TYPE "Moneda";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "clientes" (
    "cliente_id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(20),
    "direccion" TEXT,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "cotizaciones" (
    "cotizacion_id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "fecha_cotizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "estatus" "pendienteaprobadarechazada_enum" DEFAULT 'Pendiente',

    CONSTRAINT "cotizaciones_pkey" PRIMARY KEY ("cotizacion_id")
);

-- CreateTable
CREATE TABLE "detallescotizaciones" (
    "detalle_cotizacion_id" SERIAL NOT NULL,
    "cotizacion_id" INTEGER NOT NULL,
    "tipo_item" "productoserviciopaquete_enum" NOT NULL,
    "item_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "detallescotizaciones_pkey" PRIMARY KEY ("detalle_cotizacion_id")
);

-- CreateTable
CREATE TABLE "detallesproducciondemandada" (
    "detalle_produccion_id" SERIAL NOT NULL,
    "produccion_id" INTEGER,
    "producto_id" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "detallesproducciondemandada_pkey" PRIMARY KEY ("detalle_produccion_id")
);

-- CreateTable
CREATE TABLE "detallesventas" (
    "detalle_venta_id" SERIAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "tipo_item" "productoserviciopaquete_enum" NOT NULL,
    "item_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "detallesventas_pkey" PRIMARY KEY ("detalle_venta_id")
);

-- CreateTable
CREATE TABLE "disponibilidadgeneral" (
    "disponibilidad_id" SERIAL NOT NULL,
    "tipo_item" "productoservicio_enum" NOT NULL,
    "item_id" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "cantidad_disponible" INTEGER NOT NULL,

    CONSTRAINT "disponibilidadgeneral_pkey" PRIMARY KEY ("disponibilidad_id")
);

-- CreateTable
CREATE TABLE "elementospaquetes" (
    "elemento_paquete_id" SERIAL NOT NULL,
    "paquete_id" INTEGER,
    "tipo_item" "productoservicio_enum" NOT NULL,
    "item_id" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "elementospaquetes_pkey" PRIMARY KEY ("elemento_paquete_id")
);

-- CreateTable
CREATE TABLE "paquetes" (
    "paquete_id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paquetes_pkey" PRIMARY KEY ("paquete_id")
);

-- CreateTable
CREATE TABLE "producciondemandada" (
    "produccion_id" SERIAL NOT NULL,
    "venta_id" INTEGER,
    "fecha_solicitud" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_entrega" DATE,
    "estatus" "pendienteenprocesocompletadacancelada_enum" DEFAULT 'Pendiente',

    CONSTRAINT "producciondemandada_pkey" PRIMARY KEY ("produccion_id")
);

-- CreateTable
CREATE TABLE "productos" (
    "producto_id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "moneda" VARCHAR(3) DEFAULT 'BS',
    "stock" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "reservasservicios" (
    "reserva_id" SERIAL NOT NULL,
    "venta_id" INTEGER,
    "cliente_id" INTEGER,
    "servicio_id" INTEGER,
    "fecha" DATE,
    "hora" TIME(6),
    "cantidad" INTEGER NOT NULL,
    "estatus" "pendienteconfirmadacancelada_enum" DEFAULT 'Pendiente',

    CONSTRAINT "reservasservicios_pkey" PRIMARY KEY ("reserva_id")
);

-- CreateTable
CREATE TABLE "servicios" (
    "servicio_id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "tarifa" DECIMAL(10,2) NOT NULL,
    "moneda" VARCHAR(3) DEFAULT 'BS',
    "duracion" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("servicio_id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "venta_id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "fecha_venta" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "cotizacion_id" INTEGER,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("venta_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "disponibilidadgeneral_tipo_item_item_id_fecha_key" ON "disponibilidadgeneral"("tipo_item", "item_id", "fecha");

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallescotizaciones" ADD CONSTRAINT "detallescotizaciones_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "cotizaciones"("cotizacion_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallescotizaciones" ADD CONSTRAINT "fk_detallescotizaciones_paquetes" FOREIGN KEY ("item_id") REFERENCES "paquetes"("paquete_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallescotizaciones" ADD CONSTRAINT "fk_detallescotizaciones_productos" FOREIGN KEY ("item_id") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallescotizaciones" ADD CONSTRAINT "fk_detallescotizaciones_servicios" FOREIGN KEY ("item_id") REFERENCES "servicios"("servicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesproducciondemandada" ADD CONSTRAINT "detallesproducciondemandada_produccion_id_fkey" FOREIGN KEY ("produccion_id") REFERENCES "producciondemandada"("produccion_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesproducciondemandada" ADD CONSTRAINT "detallesproducciondemandada_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("producto_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventas" ADD CONSTRAINT "detallesventas_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "ventas"("venta_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventas" ADD CONSTRAINT "fk_detallesventas_paquetes" FOREIGN KEY ("item_id") REFERENCES "paquetes"("paquete_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventas" ADD CONSTRAINT "fk_detallesventas_productos" FOREIGN KEY ("item_id") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventas" ADD CONSTRAINT "fk_detallesventas_servicios" FOREIGN KEY ("item_id") REFERENCES "servicios"("servicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "disponibilidadgeneral" ADD CONSTRAINT "disponibilidadgeneral_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "disponibilidadgeneral" ADD CONSTRAINT "disponibilidadgeneral_item_id_fkey1" FOREIGN KEY ("item_id") REFERENCES "servicios"("servicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elementospaquetes" ADD CONSTRAINT "elementospaquetes_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquetes"("paquete_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "producciondemandada" ADD CONSTRAINT "producciondemandada_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "ventas"("venta_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservasservicios" ADD CONSTRAINT "reservasservicios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservasservicios" ADD CONSTRAINT "reservasservicios_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("servicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservasservicios" ADD CONSTRAINT "reservasservicios_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "ventas"("venta_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "cotizaciones"("cotizacion_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
