-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" INTEGER,
    "email" TEXT,
    "direccion" TEXT,
    "whatsappNumber" INTEGER NOT NULL,
    "profileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "fechaCotizacion" TIMESTAMP(3) NOT NULL,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContratoServicios" (
    "id" SERIAL NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "fechaContrato" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContratoServicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleCotizacion" (
    "idCotizacion" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetalleCotizacion_pkey" PRIMARY KEY ("idCotizacion","idProducto")
);

-- CreateTable
CREATE TABLE "DetalleContratoServicios" (
    "idContratoServicios" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaIni" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetalleContratoServicios_pkey" PRIMARY KEY ("idContratoServicios","idProducto")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria_Producto" (
    "idCategoria" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "Categoria_Producto_pkey" PRIMARY KEY ("idCategoria","idProducto")
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
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "caracteristicas" JSONB NOT NULL,
    "idUnidadDeMedida" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");

-- AddForeignKey
ALTER TABLE "ChatCliente" ADD CONSTRAINT "ChatCliente_id_Cliente_fkey" FOREIGN KEY ("id_Cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatCliente" ADD CONSTRAINT "ChatCliente_id_Chat_fkey" FOREIGN KEY ("id_Chat") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleCotizacion" ADD CONSTRAINT "DetalleCotizacion_idCotizacion_fkey" FOREIGN KEY ("idCotizacion") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleCotizacion" ADD CONSTRAINT "DetalleCotizacion_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleContratoServicios" ADD CONSTRAINT "DetalleContratoServicios_idContratoServicios_fkey" FOREIGN KEY ("idContratoServicios") REFERENCES "ContratoServicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleContratoServicios" ADD CONSTRAINT "DetalleContratoServicios_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Producto" ADD CONSTRAINT "Categoria_Producto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Producto" ADD CONSTRAINT "Categoria_Producto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_idUnidadDeMedida_fkey" FOREIGN KEY ("idUnidadDeMedida") REFERENCES "UnidadDeMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

