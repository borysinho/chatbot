import { Request, Response } from "express";
import { HttpException, catchedAsync, response } from "../utils";
import {
  TProductosEmbeddings,
  srvObtenerProductoEmbedding,
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

import {
  embeberDocumento,
  parseSQLToVector,
  realizarBusquedaSemantica,
} from "../services/embeddings.service";

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
    await parseSQLToVector();

    response(res, 200, { message: "Embeddings cargados" });
  }
);

export const ctrlBusquedaSemanticaProductos = catchedAsync(
  async (req: Request, res: Response) => {
    const { texto } = req.body;
    const embedding = await embeberDocumento("Texto de Usuario", [texto]);
    const { productos, servicios, paquetes } = await realizarBusquedaSemantica(
      embedding.data[0].embedding
    );

    response(res, 200, {
      productos: productos.map((item) => ({
        productoembedding_id: item.productoembedding_id,
        producto_id: item.producto_id,
        descripcion: item.descripcion,
      })),
      servicios: servicios.map((item) => ({
        servicioembedding_id: item.servicioembedding_id,
        servicio_id: item.servicio_id,
        descripcion: item.descripcion,
      })),
      paquetes: paquetes.map((item) => ({
        paqueteembedding_id: item.paqueteembedding_id,
        paquete_id: item.paquete_id,
        descripcion: item.descripcion,
      })),
    });
  }
);
