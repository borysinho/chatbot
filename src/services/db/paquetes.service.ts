import client from "../../objects/prisma.object";
import { srvObtenerProducto } from "./productos.service";
import { srvObtenerServicio } from "./servicios.service";

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
    include: {
      elementospaquetes: {
        include: {
          productos: true,
          servicios: true,
        },
      },
    },
  });

  return paquetes;

  // const elementosPaqueteConProductosOServicios = elementosPaquete.map(
  //   async (elemento) => {
  //     return {
  //       ...elemento,
  //       item:
  //         elemento.tipo_item === productoservicio_enum.Producto &&
  //         elemento.item_id !== null
  //           ? await srvObtenerProducto(elemento.item_id)
  //           : await srvObtenerServicio(elemento.item_id as number),
  //     };
  //   }
  // );

  // return elementosPaqueteConProductosOServicios;
};
