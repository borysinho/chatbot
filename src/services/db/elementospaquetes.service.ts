import client from "../../objects/prisma.object";
import { srvObtenerProducto } from "./productos.service";
import { srvObtenerServicio } from "./servicios.service";

export const srvInsertarElementoPaquete = async (elementoPaquete: any) => {
  const elementoPaqueteCreado = await client.elementosPaquetes.create({
    data: {
      paquete_id: elementoPaquete.paquete_id,
      tipo_elemento: elementoPaquete.tipo,
      producto_id: elementoPaquete.producto_id,
      servicio_id: elementoPaquete.servicio_id,
      cantidad: elementoPaquete.cantidad,
    },
  });

  return elementoPaqueteCreado;
};

export const srvObtenerElementosPaquete = async (paquete_id: number) => {
  const elementosPaquete = await client.elementosPaquetes.findMany({
    where: {
      paquete_id,
    },
  });

  return elementosPaquete;
};
