import { Request, Response } from "express";
import { HttpException, catchedAsync, response } from "../utils";
import {
  TProductosEmbeddings,
  srvObtenerProductoEmbedding,
  srvObtenerProductos,
  srvProdDescrToEmbeddings,
  srvProdPrecioToEmbeddings,
} from "../services/db/productos.service";
import {
  srvObtenerServicios,
  srvServiciosDescToEmbeddings,
  srvServiciosPrecioToEmbeddings,
} from "../services/db/servicios.service";
import {
  srvObtenerFullPaquete,
  srvPaqueteDescripcionToEmbeddings,
  srvPaquetePrecioToEmbeddings,
} from "../services/db/paquetes.service";

import {
  embeberDocumento,
  parseSQLToVector,
  realizarBusquedaSemantica,
} from "../services/embeddings.service";

export const ctrlObtenerDatos = catchedAsync(
  async (req: Request, res: Response) => {
    const productoDescripcion = await srvProdDescrToEmbeddings();
    const productoPrecio = await srvProdPrecioToEmbeddings();
    const servicioDescripcion = await srvServiciosDescToEmbeddings();
    const servicioPrecio = await srvServiciosPrecioToEmbeddings();
    const paqueteDescripcion = await srvPaqueteDescripcionToEmbeddings();
    const paquetePrecio = await srvPaquetePrecioToEmbeddings();

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
    await parseSQLToVector();

    response(res, 200, { message: "Embeddings cargados" });
  }
);

export const ctrlBusquedaSemanticaProductos = catchedAsync(
  async (req: Request, res: Response) => {
    // const { texto } = req.body;
    // const embedding = await embeberDocumento("Texto de Usuario", [texto]);
    // const { productos, servicios, paquetes } = await realizarBusquedaSemantica(
    //   embedding.data[0].embedding
    // );
    // response(res, 200, {
    //   productos: productos.map((item) => ({
    //     productoembedding_id: item.productoembedding_id,
    //     producto_id: item.producto_id,
    //     descripcion: item.descripcion,
    //   })),
    //   servicios: servicios.map((item) => ({
    //     servicioembedding_id: item.servicioembedding_id,
    //     servicio_id: item.servicio_id,
    //     descripcion: item.descripcion,
    //   })),
    //   paquetes: paquetes.map((item) => ({
    //     paqueteembedding_id: item.paqueteembedding_id,
    //     paquete_id: item.paquete_id,
    //     descripcion: item.descripcion,
    //   })),
    // });
  }
);
