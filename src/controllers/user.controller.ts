import { Request, Response } from "express";

import { catchedAsync, response } from "../utils";
import { Prisma } from "@prisma/client";
import {
  srvCreatecliente,
  srvDeleteclieteId,
  srvGetclienteId,
  srvGetclientes,
  srvUpdateclienteId,
} from "../services";

export const ctrlGetUser = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await srvGetclienteId(parseInt(id as string));
  response(res, 200, user);
});

export const ctrlGetUsers = catchedAsync(
  async (req: Request, res: Response) => {
    const users = await srvGetclientes();
    response(res, 200, users);
  }
);

export const ctrlCreateUser = catchedAsync(
  async (req: Request, res: Response) => {
    const data: Prisma.ClienteCreateInput = req.body;
    const user = await srvCreatecliente(data);
    response(res, 201, user);
  }
);

export const ctrlUpdateUser = catchedAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userSearched = await srvGetclienteId(parseInt(id as string));
    if (!userSearched) {
      response(res, 404, { message: "User not found" });
      return;
    }
    const data: Prisma.ClienteUpdateInput = req.body;
    const user = await srvUpdateclienteId(parseInt(id as string), data);
    response(res, 200, user);
  }
);

export const ctrlDeleteUser = catchedAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userSearched = await srvGetclienteId(parseInt(id as string));
    console.log({ userSearched });
    if (!userSearched) {
      response(res, 404, { message: "User not found" });
      return;
    }
    const user = await srvDeleteclieteId(parseInt(id as string));

    console.log({ UserEliminado: user });
    response(res, 204, user);
  }
);
