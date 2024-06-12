import { Role } from "@prisma/client";
import pgvector from "pgvector";
import prisma from "../../objects/prisma.object";
import { srvServiciosDescToString } from "./servicios.service";
import { embeberDocumento } from "../embeddings.service";

export const srvInsertarChat = async (
  content: string,
  whatsappNumber: string,
  profileName: string,
  role: Role
) => {
  const chat = await prisma.chat.create({
    data: {
      content,
      role,
      cliente: {
        connectOrCreate: {
          where: {
            whatsappNumber,
          },
          create: {
            whatsappNumber,
            profileName,
          },
        },
      },
    },
  });

  // const embedding = await embeberDocumento([content]);

  // const count = await srvInsertarChatEmbeddings({
  //   cliente_id: chat.cliente_id,
  //   chat_id: chat.chat_id,
  //   content,
  //   embedding,
  // });
  // console.log({ CantidadRegistro: count });

  return chat;
};

export const srvObtenerChatDesdeWhatsapp = async (whatsappNumber: string) => {
  const historialChat = await prisma.chat.findMany({
    where: {
      cliente: {
        whatsappNumber,
      },
    },
  });

  return historialChat;
};

/**
 * =================CHAT EMBEDDINGS=================
 */

export const srvInsertarChatEmbeddings = async (chat: {
  cliente_id: number;
  chat_id: number;
  content: string;
  embedding: number[];
}) => {
  const count =
    await prisma.$executeRaw`INSERT INTO "ChatEmbeddings" ("cliente_id", "chat_id", "descripcion", "embedding") VALUES
        (${chat.cliente_id}, ${chat.chat_id}, ${chat.content}, ${chat.embedding}::vector)`;
  return count;
};

export const srvObtenerChatEmbeddings = async (
  cliente_id: number,
  embedding: number[]
) => {
  // const chatEmbeddings = await prisma.$queryRaw`SELECT * FROM "ChatEmbeddings"
  // WHERE cliente_id = ${client_id} ORDER BY "embedding" <-> ${inputVector}::vector LIMIT 2`;

  const embeddings =
    await prisma.$queryRaw`SELECT "cliente_id", "chat_id", "descripcion", embedding::text FROM "ChatEmbeddings" WHERE "cliente_id"=${cliente_id} ORDER BY "embedding" <-> ${embedding}::vector LIMIT 2`;

  return embeddings;
};

/**
 * =================CHAT EMBEDDINGS=================
 */
