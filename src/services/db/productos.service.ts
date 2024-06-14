import test from "node:test";
import prisma from "../../objects/prisma.object";
import pgvector from "pgvector";
import { TDocuments, srvInsertarDocumento } from "./documents.service";

import {
  srvServiciosDescToEmbeddings,
  srvServiciosPrecioToEmbeddings,
} from "./servicios.service";
import {
  Productos,
  // ProductosEmbeddings,
  // ServiciosEmbeddings,
} from "@prisma/client";
import { embeberDocumento } from "../embeddings.service";

export type TProductosEmbeddings = {
  productoembedding_id: number;
  producto_id: number;
  descripcion: string;
  embedding: number[];
};

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

export const srvProdDescrToEmbeddings = async () => {
  const productos = await srvObtenerProductos();
  const embeddings = await embeberDocumento(
    "producto-descripcion",
    productos.map((producto) => `${producto.nombre}. ${producto.descripcion}`)
  );

  const productosArray: TDocuments[] = productos.map((producto, i: number) => {
    return {
      ref_id: producto.producto_id,
      clase: "producto-descripcion",
      descripcion: `${producto.nombre}. ${producto.descripcion}`,
      embedding: embeddings.data[i].embedding,
    };
  });

  await srvInsertarDocumento(productosArray);
  // console.log("Productos-Descripcion insertados: ", cant);

  return productosArray;
};

export const srvProdPrecioToEmbeddings = async () => {
  const productos = await srvObtenerProductos();
  const embeddings = await embeberDocumento(
    "producto-precio",
    productos.map(
      (producto) =>
        `${producto.nombre}. Costo: ${producto.precio} ${producto.moneda}`
    )
  );

  const productosArray: TDocuments[] = productos.map((producto, i: number) => {
    return {
      ref_id: producto.producto_id,
      clase: "producto-precio",
      descripcion: `${producto.nombre}. Costo: ${producto.precio} ${producto.moneda}`,
      embedding: embeddings.data[i].embedding,
    };
  });

  await srvInsertarDocumento(productosArray);
  // console.log("Productos-Precios insertados: ", cant);

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
  // Obtener todos los elementos de la tabla ProductosEmbeddings que coincidan con los IDs de los productos proporcionados
  // const prodEmbeddings = await prisma.productosEmbeddings.findMany({
  //   where: {
  //     producto_id: {
  //       in: productos.map((prod) => prod.producto_id),
  //     },
  //   },
  // });
  // let count = 0;
  // // Recorremos los productos proporcionados para insertarlos
  // for (const producto of productos) {
  //   const prodEmbedding = prodEmbeddings.filter(
  //     (prod) => prod.producto_id === producto.producto_id
  //   );
  //   // Si no existe el producto en la tabla ProductosEmbeddings, lo insertamos
  //   if (prodEmbedding.length < 2) {
  //     const embedding = pgvector.toSql(producto.embedding);
  //     count +=
  //       await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" (producto_id, descripcion, embedding) VALUES (${producto.producto_id}, ${producto.descripcion}, ${embedding}::vector)`;
  //   }
  // }
  // return count;
};

export const srvObtenerProductoEmbedding = async (vector: number[]) => {
  const embedding = pgvector.toSql(vector);
  const similitudes: TProductosEmbeddings[] =
    await prisma.$queryRaw`SELECT productoembedding_id, producto_id, descripcion, embedding::text FROM "ProductosEmbeddings" ORDER BY embedding <-> ${embedding}::vector LIMIT 2`;

  return similitudes;
};

/**
 * =====================PRODUCTOS EMBEDDINGS=====================
 */
