import { Request, Response } from "express";
import { HttpException, catchedAsync, response } from "../utils";
import {
  srvObtenerProductos,
  srvProdDescrToString,
} from "../services/db/productos.service";
import { srvObtenerServicios } from "../services/db/servicios.service";
import { srvObtenerFullPaquete } from "../services/db/paquetes.service";

export const ctrlObtenerDatos = catchedAsync(
  async (req: Request, res: Response) => {
    // const productos = await srvObtenerProductos();
    // const servicios = await srvObtenerServicios();
    // const paquetes = await srvObtenerFullPaquete();

    // response(res, 200, { productos, servicios, paquetes });

    const paquetes = await srvProdDescrToString();

    response(res, 200, { paquetes });
  }
);
