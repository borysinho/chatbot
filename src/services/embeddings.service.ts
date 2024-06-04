import prisma from "../objects/prisma.object";
import embeddingsEndPoint from "../objects/embeddings.object";
import { getFormatedDate } from "../utils";
import pgvector from "pgvector";
import { Prisma, ProductosEmbeddings } from "@prisma/client";

export async function obtenerEmbedding(input: string) {
  const endPoint = await embeddingsEndPoint.embeddings.create({
    model: "text-embedding-3-small",
    input,
    encoding_format: "float",
    dimensions: 3,
  });

  // const embedding = endPoint.data[0].embedding;

  // console.log({ endPoint, embedding });
  return endPoint;
}

export const generarEmbeddingsProductos = async () => {
  const productos = await prisma.productos.findMany({
    include: {
      unidadDeMedida: true,
      Caracteristicas: true,
      StockPorFecha: true,
    },
  });

  for (const producto of productos) {
    let detalle = "";
    // if (producto.esServicio) {
    let caracteristicas = producto.Caracteristicas.map((caracteristica) => {
      return `${caracteristica.nombre}: ${caracteristica.valor}.`;
    }).join("\n");

    caracteristicas = caracteristicas + "\n";

    detalle = `Servicio ${producto.nombre}: Este servicio tiene un costo unitario de ${producto.precioServicio} ${producto.moneda}. Las características del servicio son:\n${caracteristicas}`;

    const stockPorFecha = producto.StockPorFecha.map(
      (stock) =>
        `Para el ${getFormatedDate(stock.fecha)} ${
          stock.stock === 1 ? "queda solo " : "quedan"
        } ${stock.stock} ${
          stock.stock === 1
            ? producto.unidadDeMedida.nombre + " disponible."
            : producto.unidadDeMedida.nombrePlural + " disponibles."
        }`
    ).join("\n");

    if (stockPorFecha.length > 0) {
      detalle += `La disponibilidad del mismo está basada de acuerdo a reservas, por lo que a las fechas y disponibilidades se detallan a continuación:\n${stockPorFecha}`;
    }

    // console.log({ detalle });
    const productoEmbedding = await prisma.productosEmbeddings.findUnique({
      where: {
        idProducto: producto.id,
      },
    });

    // console.log({ productoEmbedding });

    if (productoEmbedding === null) {
      // const { embedding } = (await obtenerEmbedding(detalle)).data[0];
      // console.log(require("util").inspect({ embedding }, { depth: null }));
      const embedding = [0.63930345, 0.45545435, 0.61955833];
      //       (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
      await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" ("idProducto", "NombreProducto", "Descripcion", "Embedding") VALUES
        (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
    }
    // }
  }
};

export const obtenerSimilitudesSemanticas = async (embedding: number[]) => {
  // const similitudes = await prisma.$queryRaw`
  // SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding" FROM "ProductosEmbeddings"
  // ORDER BY "Embedding" <-> ${embedding}::float[] LIMIT 2`;

  const embeddingSQL = pgvector.toSql(embedding);
  // console.log({ embeddingSQL });

  const similitudes: ProductosEmbeddings[] = await prisma.$queryRaw`
  SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding"::text FROM "ProductosEmbeddings" ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 2`;
  // -- ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 5`;

  // const similitudes = await prisma.$queryRaw`
  // SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding::text" FROM "ProductosEmbeddings"
  // ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 5`;

  // console.log(require("util").inspect({ similitudes }, { depth: null }));

  const similitudesString: string[] = similitudes.map(
    (similitud) => `${similitud.Descripcion}"""`
  );
  // console.log({ similitudesString });

  return similitudesString;
  // return [""];
};
