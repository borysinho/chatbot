-- CreateEnum
CREATE TYPE "Remitente" AS ENUM ('Cliente', 'IA');

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "mensaje" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remitente" "Remitente" NOT NULL,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "whatsappNumber" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnidadDeMedida" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "UnidadDeMedida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idUnidadDeMedida" INTEGER NOT NULL,
    "esVendible" BOOLEAN NOT NULL,
    "esServicio" BOOLEAN NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPorFecha" (
    "fecha" TIMESTAMP(3) NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "StockPorFecha_pkey" PRIMARY KEY ("idProducto","fecha")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleDeCategoriaDeProductos" (
    "idCategoria" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "DetalleDeCategoriaDeProductos_pkey" PRIMARY KEY ("idCategoria","idProducto")
);

-- CreateTable
CREATE TABLE "ImagenProducto" (
    "idProducto" INTEGER NOT NULL,
    "urlImagen" TEXT NOT NULL,

    CONSTRAINT "ImagenProducto_pkey" PRIMARY KEY ("idProducto")
);

-- CreateTable
CREATE TABLE "Caracteristicas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "Caracteristicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuegoDeProductos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precioJuego" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "JuegoDeProductos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleJuegoDeProductos" (
    "idJuegoDeProductos" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "DetalleJuegoDeProductos_pkey" PRIMARY KEY ("idJuegoDeProductos","idProducto")
);

-- CreateTable
CREATE TABLE "DetalleProductosIndividualesCotizados" (
    "idProducto" INTEGER NOT NULL,
    "idCotizacion" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "DetalleProductosIndividualesCotizados_pkey" PRIMARY KEY ("idProducto","idCotizacion")
);

-- CreateTable
CREATE TABLE "DetalleJuegoDeProductosCotizados" (
    "idProducto" INTEGER NOT NULL,
    "idJuegoDeProductos" INTEGER NOT NULL,
    "idCotizacion" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "juegoCompleto" BOOLEAN NOT NULL,

    CONSTRAINT "DetalleJuegoDeProductosCotizados_pkey" PRIMARY KEY ("idProducto","idJuegoDeProductos","idCotizacion")
);

-- CreateTable
CREATE TABLE "DetalleProductosIndividualesContratados" (
    "idProducto" INTEGER NOT NULL,
    "idContrato" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "DetalleProductosIndividualesContratados_pkey" PRIMARY KEY ("idProducto","idContrato")
);

-- CreateTable
CREATE TABLE "DetalleJuegoDeProductosContratados" (
    "idProducto" INTEGER NOT NULL,
    "idJuegoDeProductos" INTEGER NOT NULL,
    "idContrato" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "DetalleJuegoDeProductosContratados_pkey" PRIMARY KEY ("idProducto","idJuegoDeProductos","idContrato")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_whatsappNumber_key" ON "Cliente"("whatsappNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Productos_nombre_key" ON "Productos"("nombre");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_idUnidadDeMedida_fkey" FOREIGN KEY ("idUnidadDeMedida") REFERENCES "UnidadDeMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPorFecha" ADD CONSTRAINT "StockPorFecha_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleDeCategoriaDeProductos" ADD CONSTRAINT "DetalleDeCategoriaDeProductos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleDeCategoriaDeProductos" ADD CONSTRAINT "DetalleDeCategoriaDeProductos_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenProducto" ADD CONSTRAINT "ImagenProducto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caracteristicas" ADD CONSTRAINT "Caracteristicas_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductos" ADD CONSTRAINT "DetalleJuegoDeProductos_idJuegoDeProductos_fkey" FOREIGN KEY ("idJuegoDeProductos") REFERENCES "JuegoDeProductos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductos" ADD CONSTRAINT "DetalleJuegoDeProductos_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProductosIndividualesCotizados" ADD CONSTRAINT "DetalleProductosIndividualesCotizados_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProductosIndividualesCotizados" ADD CONSTRAINT "DetalleProductosIndividualesCotizados_idCotizacion_fkey" FOREIGN KEY ("idCotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductosCotizados" ADD CONSTRAINT "DetalleJuegoDeProductosCotizados_idProducto_idJuegoDeProdu_fkey" FOREIGN KEY ("idProducto", "idJuegoDeProductos") REFERENCES "DetalleJuegoDeProductos"("idProducto", "idJuegoDeProductos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductosCotizados" ADD CONSTRAINT "DetalleJuegoDeProductosCotizados_idCotizacion_fkey" FOREIGN KEY ("idCotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProductosIndividualesContratados" ADD CONSTRAINT "DetalleProductosIndividualesContratados_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProductosIndividualesContratados" ADD CONSTRAINT "DetalleProductosIndividualesContratados_idContrato_fkey" FOREIGN KEY ("idContrato") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductosContratados" ADD CONSTRAINT "DetalleJuegoDeProductosContratados_idProducto_idJuegoDePro_fkey" FOREIGN KEY ("idProducto", "idJuegoDeProductos") REFERENCES "DetalleJuegoDeProductos"("idProducto", "idJuegoDeProductos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleJuegoDeProductosContratados" ADD CONSTRAINT "DetalleJuegoDeProductosContratados_idContrato_fkey" FOREIGN KEY ("idContrato") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

