import client from "../../objects/prisma.object";

export const srvInsertarServicio = async (servicio: any) => {
  const servicioCreado = await client.servicios.create({
    data: {
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      tarifa: servicio.tarifa,
      duracion: servicio.duracion,
    },
  });

  return servicioCreado;
};

export const srvObtenerServicios = async () => {
  const servicios = await client.servicios.findMany();

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
      duracion: servicio.duracion,
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
