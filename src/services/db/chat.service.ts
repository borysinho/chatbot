import client from "../../objects/prisma.object";
import { srvServiciosDescToString } from "./servicios.service";

export const srvInsertarChat = async (
  message: any,
  whatsappNumber: string,
  profileName: string
) => {
  const chat = await client.chat.create({
    data: {
      content: message.body,
      role: message.direction,

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

  return chat;
};

export const srvObtenerChatDesdeWhatsapp = async (whatsappNumber: string) => {
  const historialChat = await client.chat.findMany({
    where: {
      cliente: {
        whatsappNumber,
      },
    },
  });

  return historialChat;
};
