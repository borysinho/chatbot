import client from "../../objects/prisma.object";

export const srvInsertarChat = async (
  message: any,
  whatsappNumber: string,
  profileName: string
) => {
  const chat = await client..create({
    data: {
      message: message,
      clientes: {
        create: {
          whatsappNumber: whatsappNumber,
          profileName: profileName,
        },
      },
    },
  });

  return chat;
};

export const srvObtenerChatDesdeWhatsapp = async (whatsappNumber: string) => {
  const historialChat = await client.chat.findMany({
    where: {
      clientes: {
        whatsappNumber,
      },
    },
  });

  return historialChat;
};
