import { Prisma } from "@prisma/client";
import prisma from "../objects/prisma.object";

export const srvCrearChat = async (data: Prisma.ChatCreateInput) => {
  const chat = await prisma.chat.create({ data });

  return chat;
};

export const srvObtenerChatId = async (id: number) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });

  return chat;
};

export const srvObtenerChats = async () => {
  const chat = await prisma.chat.findMany();

  return chat;
};

export const srvActualizarChatId = async (
  id: number,
  data: Prisma.ChatUpdateInput
) => {
  const chat = await prisma.chat.update({
    where: {
      id,
    },
    data,
  });

  return chat;
};

export const srvEliminarChatId = async (id: number) => {
  const chat = await prisma.chat.delete({
    where: {
      id,
    },
  });

  return chat;
};

export const srvObtenerChatUsuario = async (idCliente: number) => {
  const chat = await prisma.chat.findMany({
    where: {
      idCliente,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return chat;
};
