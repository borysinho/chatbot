import pgvector from "pgvector";
import prisma from "../../objects/prisma.object";
import { PaquetesEmbeddings } from "@prisma/client";
import client from "../../objects/prisma.object";

export const srvInsertarPaquete = async (paquete: any) => {
  const paqueteCreado = await client.paquetes.create({
    data: {
      nombre: paquete.nombre,
      descripcion: paquete.descripcion,
      precio: paquete.precio,
    },
  });

  return paqueteCreado;
};

export const srvObtenerPaquetes = async () => {
  const paquetes = await client.paquetes.findMany();

  return paquetes;
};

export const srvObtenerPaquete = async (paquete_id: number) => {
  const paquete = await client.paquetes.findUnique({
    where: {
      paquete_id,
    },
  });

  return paquete;
};

export const srvActualizarPaquete = async (
  paquete_id: number,
  paquete: any
) => {
  const paqueteActualizado = await client.paquetes.update({
    where: {
      paquete_id,
    },
    data: {
      nombre: paquete.nombre,
      descripcion: paquete.descripcion,
      precio: paquete.precio,
    },
  });

  return paqueteActualizado;
};

export const srvEliminarPaquete = async (paquete_id: number) => {
  const paqueteEliminado = await client.paquetes.delete({
    where: {
      paquete_id,
    },
  });

  return paqueteEliminado;
};

export const srvObtenerFullPaquete = async () => {
  const paquetes = await client.paquetes.findMany({
    select: {
      paquete_id: true,
      nombre: true,
      descripcion: true,
      precio: true,
      moneda: true,
      elementospaquetes: {
        select: {
          cantidad: true,
          tipo_elemento: true,
          productos: {
            select: {
              nombre: true,
              descripcion: true,
              precio: true,
              moneda: true,
            },
          },
          servicios: {
            select: {
              nombre: true,
              descripcion: true,
              tarifa: true,
              moneda: true,
              duracion_en_horas: true,
            },
          },
        },
      },
    },
  });

  return paquetes;
};

export const srvPaqueteDescripcionToArrayString = async () => {
  const paquetes = await srvObtenerFullPaquete();
  const paquetesDesc = paquetes.map((paquete) => {
    const elementos = paquete.elementospaquetes.map((elemento) => {
      if (elemento.tipo_elemento === "Producto") {
        return `${elemento.cantidad}x ${elemento.productos?.nombre}`;
      } else {
        return `${elemento.cantidad}x ${elemento.servicios?.nombre}`;
      }
    });

    return {
      paquete_id: paquete.paquete_id,
      descripcion: `${paquete.nombre}. Consta de ${elementos.join(", ")}.`,
    };
  });

  // console.log({ paquetesDesc });
  return paquetesDesc;
};

export const srvPaquetePrecioToArraString = async () => {
  const paquetes = await srvObtenerFullPaquete();
  const paquetesPrecio = paquetes.map((paquete) => {
    // const texto = `${paquete.nombre}. Precio: ${paquete.precio} ${paquete.moneda}`;
    return {
      paquete_id: paquete.paquete_id,
      descripcion: `${paquete.nombre}. Precio: ${paquete.precio} ${paquete.moneda}`,
    };
  });

  return paquetesPrecio;
};

/**
 * =================PAQUETES EMBEDDINGS=================
 */

export const srvInsertarPaqueteEmbedding = async (
  paquetes: {
    paquete_id: number;
    descripcion: string;
    embedding: number[];
  }[]
) => {
  const paqEmbeddings = await prisma.paquetesEmbeddings.findMany({
    where: {
      paquete_id: {
        in: paquetes.map((paq) => paq.paquete_id),
      },
    },
  });

  let count = 0;
  for (const paquete of paquetes) {
    const paqEmbedding = paqEmbeddings.filter(
      (paqEmbedding) => paqEmbedding.paquete_id === paquete.paquete_id
    );

    if (paqEmbedding.length === 0) {
      count +=
        await prisma.$executeRaw`INSERT INTO "PaquetesEmbeddings" ("paquete_id", "descripcion", "embedding") VALUES
        (${paquete.paquete_id}, ${paquete.descripcion}, ${paquete.embedding}::vector)`;
    }
  }
  return count;
};

export const srvObtenerPaquetesEmbeddings = async (embedding: number[]) => {
  const embeddingSQL = pgvector.toSql(embedding);
  const similitudes: PaquetesEmbeddings[] = await prisma.$queryRaw`
  SELECT "paquete_id", "descripcion", "embedding"::text FROM "PaquetesEmbeddings" ORDER BY "embedding" <-> ${embeddingSQL}::vector LIMIT 2`;

  return similitudes;
};
/**
 * =================PAQUETES EMBEDDINGS=================
 */
