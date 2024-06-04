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
      id: "desc",
    },
  });

  return chat;
};

export const srvInsertarMensajeChat = async (
  data: Prisma.ChatCreateWithoutClienteInput,
  whatsappNumber: string,
  profileName: string
) => {
  const mensajeInsertado = await prisma.chat.create({
    data: {
      ...data,
      cliente: {
        connectOrCreate: {
          where: {
            whatsappNumber: whatsappNumber,
          },
          create: {
            whatsappNumber: whatsappNumber,
            profileName: profileName,
          },
        },
      },
    },
    select: {
      role: true,
      content: true,
      cliente: true,
    },
  });

  // console.log({ mensajeInsertado });

  const mensajes = await prisma.chat.findMany({
    where: {
      idCliente: mensajeInsertado.cliente.id,
    },
    orderBy: {
      id: "desc",
    },
    select: {
      role: true,
      content: true,
    },
    take: 4,
  });

  return mensajes;
};

// export const srvObtenerChatUsuarioWhatsapp = async (
//   whatsappNumber: string,
//   profileName?: string
// ) => {
//   const cliente = await prisma.cliente.findUnique({
//     where: {
//       whatsappNumber: whatsappNumber,
//     },
//   });

//   if (cliente) {
//     const chat = await prisma.chat.findMany({
//       where: {
//         idCliente: cliente.id,
//       },
//       orderBy: {
//         id: "desc",
//       },
//     });

//     return chat;
//   } else {
//     if (profileName) {
//       await prisma.cliente.create({
//         data: {
//           whatsappNumber: whatsappNumber,
//           profileName: profileName,
//         },
//       });
//     }
//     return [];
//   }
// };

// async function main() {
//   const chatCompletion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "Eres un adolescente de 15 años",
//       },
//       {
//         role: "user",
//         content: "Necesito aprender java",
//       },
//       {
//         role: "assistant",
//         content:
//           "¡Genial! Aprender un nuevo lenguaje de programación como Java puede parecer abrumador al principio, pero con dedicación y práctica, puedes dominarlo. Aquí hay algunos pasos que puedes seguir para comenzar a aprender Java:\n\n1. Comprensión básica de la programación: Si nunca has programado antes, es una buena idea familiarizarse con los conceptos básicos de la programación. Puedes encontrar muchos recursos en línea que explican los conceptos básicos de la programación, como variables, bucles, funciones y estructuras de control.\n2. Herramientas de desarrollo: Descarga e instala una herramienta de desarrollo de Java, como Eclipse o IntelliJ IDEA. Estas herramientas proporcionan un entorno de desarrollo integrado (IDE) que te ayudará a escribir, depurar y ejecutar tu código.\n3. Aprende Java: Hay muchos recursos en línea disponibles para aprender Java, desde cursos en línea hasta tutoriales y libros. Una vez que hayas aprendido los conceptos básicos de la programación, comienza a aprender los conceptos específicos de Java, como tipos de datos, operadores, estructuras de control, clases y objetos, paquetes y",
//       },
//       {
//         role: "user",
//         content: "Que cosas puedo hacer con esto?",
//       },
//       {
//         role: "assistant",
//         content:
//           "Java es un lenguaje de programación muy popular y versátil que se puede utilizar para una variedad de aplicaciones y propósitos. Algunas de las cosas que puedes hacer con Java incluyen:\n\n1. Desarrollo de aplicaciones de escritorio: Puedes usar Java para crear aplicaciones de escritorio robustas y potentes que se ejecuten en cualquier sistema operativo compatible con Java.\n2. Desarrollo web: Java se puede usar para crear aplicaciones web dinámicas y atractivas que se ejecuten en un servidor web. También se puede usar con marcos de desarrollo web como Spring y Hibernate.\n3. Desarrollo de juegos: Java se puede usar para crear juegos de escritorio y juegos web simples. También hay varios motores de juegos y marcos disponibles que facilitan el desarrollo de juegos en Java.\n4. Desarrollo de aplicaciones móviles: Java se puede usar para crear aplicaciones móviles para Android. De hecho, la mayoría de las aplicaciones de Android están escritas en Java.\n5. Desarrollo de aplicaciones empresariales: Java es ideal para el desarrollo de aplicaciones empresariales grandes y complejas que requieren robustez, seguridad y escalabilidad.\n6. Internet de las Cos",
//       },
//       {
//         role: "user",
//         content: "",
//       },
//     ],
//     model: "mixtral-8x7b-32768",
//     temperature: 1,
//     max_tokens: 330,
//     top_p: 1,
//     stream: false,
//     stop: null,
//   });

//   console.log(chatCompletion.choices[0].message.content);
// }

// main();
