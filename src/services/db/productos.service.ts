import test from "node:test";
import prisma from "../../objects/prisma.object";
import pgvector from "pgvector";

import {
  srvServiciosDescToString,
  srvServiciosPrecioToString,
} from "./servicios.service";
import {
  Productos,
  ProductosEmbeddings,
  ServiciosEmbeddings,
} from "@prisma/client";

export const srvInsertarProducto = async (producto: any) => {
  const productoCreado = await prisma.productos.create({
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
  const productos = await prisma.productos.findMany({
    select: {
      producto_id: true,
      nombre: true,
      descripcion: true,
      precio: true,
      moneda: true,
    },
  });

  return productos;
};

export const srvObtenerProducto = async (producto_id: number) => {
  const producto = await prisma.productos.findUnique({
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
  const productoActualizado = await prisma.productos.update({
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
  const productoEliminado = await prisma.productos.delete({
    where: {
      producto_id,
    },
  });

  return productoEliminado;
};

export const srvProdDescrToString = async () => {
  const productos = await srvObtenerProductos();
  const productosArray = productos.map((producto) => {
    return {
      producto_id: producto.producto_id,
      descripcion: `${producto.nombre}. ${producto.descripcion}`,
    };
  });
  // console.log({ productosArray });
  return productosArray;
};

export const srvProdPrecioToString = async () => {
  const productos = await srvObtenerProductos();
  const productosArray = productos.map((producto) => {
    return {
      producto_id: producto.producto_id,
      descripcion: `${producto.nombre}. Costo: ${producto.precio} ${producto.moneda}`,
    };
  });
  // console.log({ productosArray });
  return productosArray;
};

/**
 * =====================PRODUCTOS EMBEDDINGS=====================
 */

export const srvInsertarProductoEmbedding = async (
  productos: {
    producto_id: number;
    descripcion: string;
    embedding: number[];
  }[]
) => {
  const prodEmbeddings = await prisma.productosEmbeddings.findMany({
    where: {
      producto_id: {
        in: productos.map((prod) => prod.producto_id),
      },
    },
  });

  let count = 0;

  for (const producto of productos) {
    const prodEmbedding = prodEmbeddings.filter(
      (prodEmbedding) => prodEmbedding.producto_id === producto.producto_id
    );

    console.log({ prodEmbedding });
    if (prodEmbedding.length === 0) {
      const embedding = pgvector.toSql(producto.embedding);
      console.log({ prodEmbedding });
      count +=
        await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" (producto_id, descripcion, embedding) VALUES (${producto.producto_id}, ${producto.descripcion}, ${embedding}::vector)`;
      // await prisma.$executeRaw`INSERT INTO items (embedding) VALUES (${embedding}::vector)`
      // await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" (producto_id, descripcion, embedding) VALUES (${producto.producto_id}, ${producto.descripcion}, ${embedding}::vector)`;
      // count +=
      // await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" ("producto_id", "descripcion", "embedding") VALUES
      //   (${producto.producto_id}, ${producto.descripcion}, ${producto.embedding}::vector)`;
    }
  }

  return count;
};

type TProductosEmbeddings = {
  productoembedding_id: number;
  producto_id: number;
  descripcion: string;
  embedding: number[];
};

export const srvObtenerProductoEmbedding = async (vector: number[]) => {
  // const embeddingSQL = pgvector.toSql(embedding);

  const embedding = pgvector.toSql(vector);
  console.log({ EstoRecibo: embedding });
  const similitudes =
    await prisma.$queryRaw`SELECT productoembedding_id, producto_id, descripcion, embedding::text FROM "ProductosEmbeddings" ORDER BY embedding <-> ${embedding}::vector LIMIT 2`;

  // const similitudes: ProductosEmbeddings[] = await prisma.$queryRaw`
  // SELECT "producto_id", "descripcion", "embedding"::text FROM "ProductosEmbeddings" ORDER BY "embedding" <-> ${embedding}::vector LIMIT 2`;

  return similitudes;
};

/**
 * =====================PRODUCTOS EMBEDDINGS=====================
 */
