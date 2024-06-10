import client from "../../objects/prisma.object";
import {
  srvPaqueteDescripcionToArrayString,
  srvPaquetePrecioToArraString,
} from "./paquetes.service";
import {
  srvServiciosDescToString,
  srvServiciosPrecioToString,
} from "./servicios.service";

export const srvInsertarProducto = async (producto: any) => {
  const productoCreado = await client.productos.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    },
  });

  return productoCreado;
};

export const srvObtenerProductos = async () => {
  const productos = await client.productos.findMany({
    select: {
      nombre: true,
      descripcion: true,
      precio: true,
      moneda: true,
    },
  });

  return productos;
};

export const srvObtenerProducto = async (producto_id: number) => {
  const producto = await client.productos.findUnique({
    where: {
      producto_id,
    },
  });

  return producto;
};

export const srvActualizarProducto = async (
  producto_id: number,
  producto: any
) => {
  const productoActualizado = await client.productos.update({
    where: {
      producto_id,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    },
  });

  return productoActualizado;
};

export const srvEliminarProducto = async (producto_id: number) => {
  const productoEliminado = await client.productos.delete({
    where: {
      producto_id,
    },
  });

  return productoEliminado;
};

export const srvProdDescrToString = async () => {
  const productos = await srvObtenerProductos();
  const productosArray = productos.map(
    (producto) => `${producto.nombre}. ${producto.descripcion}`
  );
  console.log({ productosArray });
  return productosArray;
};

export const srvProdPrecioToString = async () => {
  const productos = await srvObtenerProductos();
  const productosArray = productos.map(
    (producto) =>
      `${producto.nombre}. Precio: ${producto.precio} ${producto.moneda}`
  );
  console.log({ productosArray });
  return productosArray;
};
srvPaquetePrecioToArraString();
