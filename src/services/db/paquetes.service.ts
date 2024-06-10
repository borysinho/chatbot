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
    select: {
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

    // const texto = `${paquete.nombre}. Consta de ${elementos.join(", ")}. Precio: ${paquete.precio} ${paquete.moneda}`;
    const texto = `${paquete.nombre}. Consta de ${elementos.join(", ")}.`;

    return texto;
  });

  console.log({ paquetesDesc });
  return paquetesDesc;
};

export const srvPaquetePrecioToArraString = async () => {
  const paquetes = await srvObtenerFullPaquete();
  const paquetesPrecio = paquetes.map((paquete) => {
    // const texto = `${paquete.nombre}. Precio: ${paquete.precio} ${paquete.moneda}`;
    const texto = `${paquete.nombre}. Precio: ${paquete.precio} ${paquete.moneda}`;

    return texto;
  });

  return paquetesPrecio;
};
