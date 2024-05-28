import prisma from "../objects/prisma.object";
import { Prisma } from "@prisma/client";

export const srvGetclienteId = async (id: number) => {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id,
    },
  });

  return cliente;
};

export const srvGetclientes = async () => {
  const cliente = await prisma.cliente.findMany();

  return cliente;
};

export const srvCreatecliente = async (data: Prisma.ClienteCreateInput) => {
  const cliente = await prisma.cliente.create({ data });

  return cliente;
};

export const srvUpdateclienteId = async (
  id: number,
  data: Prisma.ClienteUpdateInput
) => {
  const cliente = await prisma.cliente.update({
    where: {
      id,
    },
    data,
  });

  return cliente;
};

export const srvUpdateClienteWhatsapp = async (
  waNumber: string,
  data: Prisma.ClienteUpdateInput
) => {
  const cliente = await prisma.cliente.update({
    where: {
      whatsappNumber: waNumber,
    },
    data,
  });

  return cliente;
};

export const srvDeleteclieteId = async (id: number) => {
  const cliente = await prisma.cliente.delete({
    where: {
      id,
    },
  });

  return cliente;
};

// export const srvGetWithFullPhoneNumber = async (fullPhoneNumber: string) => {
//   const clietes = await srvGetclientes();
//   const cliete = clietes.find(
//     (cliente) => cliente.fullNumber === fullPhoneNumber
//   );
//   return cliente;
// };
