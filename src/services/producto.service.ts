import prisma from "../objects/prisma.object";
import { Prisma } from "@prisma/client";

export const srvGetProductoById = async (id: number) => {
  const producto = await prisma.productos.findUnique({
    where: {
      id,
    },
  });

  return producto;
};

export const srvGetProductos = async () => {
  const productos = await prisma.productos.findMany();

  return productos;
};

export const srvCreateProducto = async (data: Prisma.ProductosCreateInput) => {
  const producto = await prisma.productos.create({ data });

  return producto;
};

export const srvUpdateProductoById = async (
  id: number,
  data: Prisma.ProductosUpdateInput
) => {
  const producto = await prisma.productos.update({
    where: {
      id,
    },
    data,
  });

  return producto;
};

export const srvDeleteProductoById = async (id: number) => {
  const producto = await prisma.productos.delete({
    where: {
      id,
    },
  });

  return producto;
};
