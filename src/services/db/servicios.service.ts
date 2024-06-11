import { ServiciosEmbeddings } from "@prisma/client";
import client from "../../objects/prisma.object";

export const srvInsertarServicio = async (servicio: any) => {
  const servicioCreado = await client.servicios.create({
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
  const servicios = await client.servicios.findMany({
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
  const servicio = await client.servicios.findUnique({
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
  const servicioActualizado = await client.servicios.update({
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
  const servicioEliminado = await client.servicios.delete({
    where: {
      servicio_id,
    },
  });

  return servicioEliminado;
};

export const srvServiciosDescToString = async () => {
  const servicios = await srvObtenerServicios();

  const serviciosString: ServiciosEmbeddings[] = servicios.map((servicio) => {
    return {
      servicio_id: servicio.servicio_id,
      descripcion: `${servicio.nombre}. ${servicio.descripcion}`,
    };
  });

  return serviciosString;
};

export const srvServiciosPrecioToString = async () => {
  const servicios = await srvObtenerServicios();

  const serviciosString: ServiciosEmbeddings[] = servicios.map((servicio) => {
    return {
      servicio_id: servicio.servicio_id,
      descripcion: `${servicio.nombre}. Costo: ${servicio.tarifa} ${servicio.moneda}`,
    };
  });

  // console.log({ serviciosString });
  return serviciosString;
};
