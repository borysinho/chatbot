import pgvector from "pgvector";
import { ServiciosEmbeddings } from "@prisma/client";
import prisma from "../../objects/prisma.object";

export const srvInsertarServicio = async (servicio: any) => {
  const servicioCreado = await prisma.servicios.create({
    data: {
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      tarifa: servicio.tarifa,
      duracion_en_horas: servicio.duracion,
    },
  });

  return servicioCreado;
};

export const srvObtenerServicios = async () => {
  const servicios = await prisma.servicios.findMany({
    select: {
      servicio_id: true,
      nombre: true,
      descripcion: true,
      tarifa: true,
      moneda: true,
      duracion_en_horas: true,
    },
  });

  return servicios;
};

export const srvObtenerServicio = async (servicio_id: number) => {
  const servicio = await prisma.servicios.findUnique({
    where: {
      servicio_id,
    },
  });

  return servicio;
};

export const srvActualizarServicio = async (
  servicio_id: number,
  servicio: any
) => {
  const servicioActualizado = await prisma.servicios.update({
    where: {
      servicio_id,
    },
    data: {
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      tarifa: servicio.tarifa,
      duracion_en_horas: servicio.duracion,
    },
  });

  return servicioActualizado;
};

export const srvEliminarServicio = async (servicio_id: number) => {
  const servicioEliminado = await prisma.servicios.delete({
    where: {
      servicio_id,
    },
  });

  return servicioEliminado;
};

export const srvServiciosDescToString = async () => {
  const servicios = await srvObtenerServicios();

  const serviciosString = servicios.map((servicio) => {
    return {
      servicio_id: servicio.servicio_id,
      descripcion: `${servicio.nombre}. ${servicio.descripcion}`,
    };
  });

  return serviciosString;
};

export const srvServiciosPrecioToString = async () => {
  const servicios = await srvObtenerServicios();

  const serviciosString = servicios.map((servicio) => {
    return {
      servicio_id: servicio.servicio_id,
      descripcion: `${servicio.nombre}. Costo: ${servicio.tarifa} ${servicio.moneda}`,
    };
  });

  // console.log({ serviciosString });
  return serviciosString;
};

/**
 * ===============SERVICIOS EMDBEDDINGS================
 */

export const srvInsertarServicioEmbedding = async (
  servicios: {
    servicio_id: number;
    descripcion: string;
    embedding: number[];
  }[]
) => {
  const servEmbeddings = await prisma.serviciosEmbeddings.findMany({
    where: {
      servicio_id: {
        in: servicios.map((serv) => serv.servicio_id),
      },
    },
  });

  let count = 0;

  for (const servicio of servicios) {
    const servEmbedding = servEmbeddings.filter(
      (servEmbedding) => servEmbedding.servicio_id === servicio.servicio_id
    );

    if (servEmbedding.length === 0) {
      count +=
        await prisma.$executeRaw`INSERT INTO "ServiciosEmbeddings" ("servicio_id", "descripcion", "embedding") VALUES
        (${servicio.servicio_id}, ${servicio.descripcion}, ${servicio.embedding}::vector)`;
    }
  }

  return count;
};

export const srvObtenerServiciosEmbeddings = async (embedding: number[]) => {
  const embeddingSQL = pgvector.toSql(embedding);
  const similitudes: ServiciosEmbeddings[] = await prisma.$queryRaw`
  SELECT "servicio_id", "descripcion", "embedding"::text FROM "ServiciosEmbeddings" ORDER BY "embedding" <-> ${embeddingSQL}::vector LIMIT 2`;

  return similitudes;
};

/**
 * ===============SERVICIOS EMDBEDDINGS================
 */
