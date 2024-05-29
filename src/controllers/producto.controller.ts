import { Request, Response } from "express";

import { catchedAsync, response } from "../utils";
import { Prisma } from "@prisma/client";

import { srvGetProductos, srvGetProductoId } from "../services";

export const ctrlGetProductos = catchedAsync(
  async (req: Request, res: Response) => {
    const productos = await srvGetProductos();
    console.log(productos);
    response(res, 200, productos);
  }
);

export const ctrlGetProducto = catchedAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await srvGetProductoId(parseInt(id as string));
    response(res, 200, producto);
  }
);
