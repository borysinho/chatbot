import { Request, Response } from "express";
import { HttpException, catchedAsync, response } from "../utils";
import {
  srvObtenerProductos,
  srvProdDescrToString,
  srvProdPrecioToString,
} from "../services/db/productos.service";
import {
  srvObtenerServicios,
  srvServiciosDescToString,
  srvServiciosPrecioToString,
} from "../services/db/servicios.service";
import {
  srvObtenerFullPaquete,
  srvPaqueteDescripcionToArrayString,
  srvPaquetePrecioToArraString,
} from "../services/db/paquetes.service";

import { generarEmbeddingsProductos } from "../services/embeddings.service";

export const ctrlObtenerDatos = catchedAsync(
  async (req: Request, res: Response) => {
    const productoDescripcion = await srvProdDescrToString();
    const productoPrecio = await srvProdPrecioToString();
    const servicioDescripcion = await srvServiciosDescToString();
    const servicioPrecio = await srvServiciosPrecioToString();
    const paqueteDescripcion = await srvPaqueteDescripcionToArrayString();
    const paquetePrecio = await srvPaquetePrecioToArraString();

    console.log({
      productoDescripcion,
      productoPrecio,
      servicioDescripcion,
      servicioPrecio,
      paqueteDescripcion,
      paquetePrecio,
    });

    response(res, 200, { paqueteDescripcion, paquetePrecio });
  }
);

export const ctrlCargarEmbeddings = catchedAsync(
  async (req: Request, res: Response) => {
    // Cargamos los embeddings de los productos
    // await generarEmbeddingsProductos();
    await generarEmbeddingsProductos();

    response(res, 200, { message: "Embeddings cargados" });
  }
);
