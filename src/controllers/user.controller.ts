import { Request, Response } from "express";

import { catchedAsync, response } from "../utils";
import { Prisma } from "@prisma/client";
import {
  srvGetUser,
  srvCreateUser,
  srvDeleteUser,
  srvGetUsers,
  srvUpdateUser,
} from "../services";

export const ctrlGetUser = catchedAsync(async (req: Request, res: Response) => {
  const { countrycode, cellphone } = req.query;
  const user = await srvGetUser(
    parseInt(countrycode as string),
    parseInt(cellphone as string)
  );
  response(res, 200, user);
});

export const ctrlGetUsers = catchedAsync(
  async (req: Request, res: Response) => {
    const users = await srvGetUsers();
    response(res, 200, users);
  }
);

export const ctrlCreateUser = catchedAsync(
  async (req: Request, res: Response) => {
    const data: Prisma.UserCreateInput = req.body;
    console.log({ data });
    const user = await srvCreateUser(data);
    response(res, 201, user);
  }
);

export const ctrlUpdateUser = catchedAsync(
  async (req: Request, res: Response) => {
    const { countrycode, cellphone } = req.query;
    const userSearched = await srvGetUser(
      parseInt(countrycode as string),
      parseInt(cellphone as string)
    );
    if (!userSearched) {
      response(res, 404, { message: "User not found" });
      return;
    }
    const data: Prisma.UserUpdateInput = req.body;
    const user = await srvUpdateUser(
      parseInt(countrycode as string),
      parseInt(cellphone as string),
      data
    );
    response(res, 200, user);
  }
);

export const ctrlDeleteUser = catchedAsync(
  async (req: Request, res: Response) => {
    const { countrycode, cellphone } = req.query;
    const userSearched = await srvGetUser(
      parseInt(countrycode as string),
      parseInt(cellphone as string)
    );
    console.log({ userSearched });
    if (!userSearched) {
      response(res, 404, { message: "User not found" });
      return;
    }
    const user = await srvDeleteUser(
      parseInt(countrycode as string),
      parseInt(cellphone as string)
    );

    console.log({ UserEliminado: user });
    response(res, 204, user);
  }
);
