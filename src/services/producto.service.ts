import prisma from "../objects/prisma.object";
import { Prisma } from "@prisma/client";

export const srvGetProductos = async () => {
  const productos = await prisma.producto.findMany();

  console.log(productos);

  return productos;
};

export const srvGetProductoId = async (id: number) => {
  const producto = await prisma.producto.findUnique({
    where: {
      id,
    },
  });
  return producto;
};
