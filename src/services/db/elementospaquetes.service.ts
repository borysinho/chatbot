import { productoservicio_enum } from "@prisma/client";
import client from "../../objects/prisma.object";
import { srvObtenerProducto } from "./productos.service";
import { srvObtenerServicio } from "./servicios.service";

export const srvInsertarElementoPaquete = async (
  elementoPaquete: any,
  item_id: number,
  productoOServicio: productoservicio_enum
) => {
  const elementoPaqueteCreado = await client.elementospaquetes.create({
    data: {
      paquete_id: elementoPaquete.paquete_id,
      cantidad: elementoPaquete.cantidad,
      tipo_item: productoOServicio,
      item_id,
    },
  });

  return elementoPaqueteCreado;
};

export const srvObtenerElementosPaquete = async (paquete_id: number) => {
  const elementosPaquete = await client.elementospaquetes.findMany({
    where: {
      paquete_id,
    },
    include: {
      paquetes: true,
    },
  });

  const elementosPaqueteConProductosOServicios = elementosPaquete.map(
    async (elemento) => {
      return {
        ...elemento,
        item:
          elemento.tipo_item === productoservicio_enum.Producto &&
          elemento.item_id !== null
            ? await srvObtenerProducto(elemento.item_id)
            : await srvObtenerServicio(elemento.item_id as number),
      };
    }
  );

  console.log({ elementosPaqueteConProductosOServicios });

  return elementosPaqueteConProductosOServicios;
};
