import prisma from "../objects/prisma.object";
import { Prisma } from "@prisma/client";

export const srvGetUser = async (countrycode: number, cellphone: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: {
        countrycode,
        cellphone,
      },
    },
  });

  return user;
};

export const srvGetUsers = async () => {
  const user = await prisma.user.findMany();

  return user;
};

export const srvCreateUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({ data });

  return user;
};

export const srvUpdateUser = async (
  countrycode: number,
  cellphone: number,
  data: Prisma.UserUpdateInput
) => {
  const user = await prisma.user.update({
    where: {
      id: {
        countrycode,
        cellphone,
      },
    },
    data,
  });

  return user;
};

export const srvDeleteUser = async (countrycode: number, cellphone: number) => {
  const user = await prisma.user.delete({
    where: {
      id: {
        countrycode,
        cellphone,
      },
    },
  });

  return user;
};

export const srvGetWithFullPhoneNumber = async (fullPhoneNumber: string) => {
  const users = await srvGetUsers();
  const user = users.find((user) => user.fullNumber === fullPhoneNumber);
  return user;
};
