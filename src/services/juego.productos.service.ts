import prisma from "../objects/prisma.object";
import { Prisma } from "@prisma/client";

export const srvGetJuegoDeProductosById = async (id: number) => {
  const paquete = await prisma.juegoDeProductos.findUnique({
    where: {
      id,
    },
  });

  return paquete;
};

export const srvGetJuegoDeProductos = async () => {
  const paquete = await prisma.juegoDeProductos.findMany();

  return paquete;
};

export const srvCreateJuegoDeProductos = async (
  data: Prisma.JuegoDeProductosCreateInput
) => {
  const paquete = await prisma.juegoDeProductos.create({ data });

  return paquete;
};

export const srvUpdateJuegoDeProductosById = async (
  id: number,
  data: Prisma.JuegoDeProductosUpdateInput
) => {
  const paquete = await prisma.juegoDeProductos.update({
    where: {
      id,
    },
    data,
  });

  return paquete;
};

export const srvDeleteJuegoDeProductosById = async (id: number) => {
  const paquete = await prisma.juegoDeProductos.delete({
    where: {
      id,
    },
  });

  return paquete;
};
export const srvGetProductosEnJuegoDeProductos = async (id: number) => {
  const productos = await prisma.productos.findMany({
    where: {
      DetalleJuegoDeProductos: {
        some: {
          idJuegoDeProductos: id,
        },
      },
    },
    include: {
      DetalleJuegoDeProductos: true,
    },
  });

  return productos;
};
