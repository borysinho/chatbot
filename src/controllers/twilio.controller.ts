import { Request, Response } from "express";
import { twiml } from "twilio";
import { HttpException, catchedAsync, response } from "../utils";
import twilio from "../objects/twilio.object";
import {
  completarChat,
  generarEmbeddingsProductos,
  obtenerEmbedding,
  obtenerSimilitudesSemanticas,
  srvInsertarMensajeChat,
  srvUpdateClienteWhatsapp,
} from "../services";
import { Cliente } from "@prisma/client";
import {
  DownloadAudio,
  TranscribeAudio,
  sendWhatsappMessage,
  uploadAudio,
} from "../services/twilio.service";

const MessagingResponse = twiml.MessagingResponse;

export const newMessage = catchedAsync(async (req: Request, res: Response) => {
  let {
    WaId: whatsappNumber,
    Body: mensaje,
    ProfileName: profileName,
    MediaContentType0,
    MediaUrl0,
  } = req.body;

  // Si el mensaje es un audio, lo transcribimos
  if (MediaContentType0 && MediaContentType0.startsWith("audio/")) {
    const audioUrl = MediaUrl0;

    const audioFilename = await DownloadAudio(audioUrl);
    const audioUrlCloud = await uploadAudio(audioFilename);
    String(audioUrlCloud);
    const transcribedAudio = await TranscribeAudio(audioUrlCloud);

    mensaje = transcribedAudio;
  }

  console.log({ mensaje, whatsappNumber, profileName });

  // Cargamos los embeddings de los productos
  await generarEmbeddingsProductos();

  // Convertirmos a embeddings el mensaje del usuario
  const result = await obtenerEmbedding(mensaje);
  console.log({ result });
  const { embedding: embeddingMensajeUsuario } = result.data[0];
  console.log({ embeddingMensajeUsuario });

  // Obtenemos el top 2 de similitudes en los embeddings
  const similitudes: string[] = await obtenerSimilitudesSemanticas(
    embeddingMensajeUsuario
  );

  console.log({ similitudes });

  // Insertamos el mensaje del usuario en la base de datos
  const userChat = await srvInsertarMensajeChat(
    {
      role: "user",
      content: mensaje,
    },
    whatsappNumber,
    profileName
  );

  console.log({ userChat });

  // Actualizamos el template
  systemTemplate.content += `\nDatos para elaborar respuesta:\n${similitudes}`;

  // Completamos el chat
  const chatCompletion = await completarChat(
    whatsappNumber,
    profileName,
    [systemTemplate],
    userChat
  );

  console.log({ chatCompletion });

  // Insertamos la respuesta de la IA en la base de datos
  const IAChat = await srvInsertarMensajeChat(
    { role: "assistant", content: chatCompletion.choices[0].message.content },
    whatsappNumber,
    profileName
  );

  console.log({ IAChat });

  // Enviamos respuesta para Twilio
  await sendWhatsappMessage(
    whatsappNumber,
    chatCompletion.choices[0].message.content
  );

  res.status(200);

  // console.log(WaId);

  // const chatHistory = await ListMessagesFromNumber(WaId);

  // const searchedUser = WaId;

  // let Cliente: Cliente;

  // // Si el usuario no está registrado o si el ProfileName ha cambiado
  // if (searchedUser && searchedUser.name !== ProfileName) {
  //   // Actualizamos el nombre del usuario al ProfileName
  //   Cliente = await srvUpdateClienteWhatsapp(WaId, {
  //     profileName: ProfileName,
  //   });
  // } else {
  //   // Si NO existe el usuario
  //   if (!searchedUser) {
  //     // Creamos el usuario
  //     const code = await twilio.lookups.v1.phoneNumbers(WaId).fetch();

  //     const { nationalFormat, phoneNumber } = code;
  //     const dif = phoneNumber.length - nationalFormat.length - 1;
  //     console.log({ dif });
  //     const countryCode = phoneNumber.substring(1, dif + 1);

  //     Cliente = await srvCreatecliente({
  //       whatsappNumber: WaId,
  //       profileName: ProfileName,
  //     });
  //   } else {
  //     // El usuario existe pero el nombre del perfil sigue igual entonces no hacemos nada
  //     Cliente = searchedUser;
  //   }
  // }
  // console.log({ Cliente });
  // // Enviamos mensaje a la API de la IA
  // if (!Cliente) {
  //   throw new HttpException(400, "No se pudo obtener el usuario");
  // }
  // console.log({ user: Cliente.nombre || "" });

  // if (MediaContentType0 && MediaContentType0.startsWith("audio/")) {
  //   const audioUrl = MediaUrl0;

  //   const audioFilename = await DownloadAudio(audioUrl);
  //   const audioUrlCloud = await uploadAudio(audioFilename);
  //   String(audioUrlCloud);
  //   const transcribedAudio = await TranscribeAudio(audioUrlCloud);

  //   Body = transcribedAudio;
  // }

  // const chatCompletion = await srvIASend(
  //   Cliente.nombre || "",
  //   Body,
  //   chatHistory || []
  // );

  // console.log(chatCompletion.choices[0]?.message?.content);

  //seria bueno mover esto a otra carpeta
  // function getWordsCount(text: string) {
  //   if (!text) return 0;
  //   return text.split(/\s+/).length;
  // }

  /*  function calculateTime(length: number){
    if(!length) return 0;
    return 
  } */

  // // Preparamos una respuesta para Twilio
  // const msgRes = new MessagingResponse();
  // msgRes.message(chatCompletion.choices[0]?.message?.content || "");

  // // Respondemos con la respuesta obtenida
  // res.send(msgRes.toString());
});

type CompletionMessageType = {
  role: string;
  content: string;
};

// const systemTemplate: CompletionMessageType = {
//   role: "system",
//   content: `Eres una IA que vende productos y servicios para bodas y eventos sociales.
// 1. Pregunta qué producto o servicio está buscando.
// 2. Busca el producto o servicio del catalogo.
// 3. Si existe, confirma que se cuenta con ese producto indicando únicamente el precio y las características del producto o servicio
// 4. Si no existe, ofrece productos o servicios similares indicando únicamente el precio y las características del producto o servicio
// 5. Si el usuario está interesado, pregunta cuántos desea.
// 6. Si el usuario confirma la cantidad deseada y este es un servicio, pregunta la fecha en la que lo necesita.
// 7. Al indicarte la fecha, verifica si hay disponibilidad para esa fecha y confirma la reserva del servicio.
// 8. Si el usuario está interesado en un producto, verifica si hay stock disponible.
// 9. Si hay stock disponible, pregunta cuántos desea.
// 10. Si el usuario confirma la cantidad deseada, pregunta la dirección de entrega del producto junto a la fecha y hora para agendar la entrega.
// 11. Finaliza la transacción o puede ofrecer productos o servicios adicionales.
// Los productos y servicios junto a sus descripciones estarán delimitados con los siguientes caracteres """`,
// };

const systemTemplate: CompletionMessageType = {
  role: "system",
  content: `Tu nombre es Paul y estas son tus características:
  
Paul solo habla español.
Paul es un organizador de bodas.
Paul es amable.
Paul usa muchos emojis al responder.
Paul siempre busca en el catálogo con nombre CATALOGO_IMP.
Paul solo ofrece productos o servicios que se encuentran en el catálogo CATALOGO_IMP.
Paul no ofrece nada si no lo encuentra en el catálogo CATALOGO_IMP.
Paul es sincero con sus clientes.
Cuando Paul no encuentra un producto o servicio en el catálogo CATALOGO_IMP le promete al cliente que lo conseguirá para la siguiente semana
Paul nunca revela que es una IA
Paul nunca menciona el nombre del catálogo
Paul es sarcástico cuando le preguntan cosas que no tienen nada que ver con la noche de bodas.
Paul nunca se sale de sus características.
-- Fin de características --`,
};

const test = async (
  mensaje: string,
  whatsappNumber: string,
  profileName: string
) => {
  // Cargamos los embeddings de los productos
  await generarEmbeddingsProductos();

  // Convertirmos a embeddings el mensaje del usuario
  // const result = await obtenerEmbedding(mensaje);
  // const { embedding } = result.data[0];

  const embedding = [0.028576007, -0.983466, -0.17882407];

  // console.log({ embedding });

  const similitudes: string[] = await obtenerSimilitudesSemanticas(embedding);

  // console.log({ similitudes });

  // Obtenemos la respuesta de la IA
  const chat = await srvInsertarMensajeChat(
    {
      role: "user",
      content: mensaje,
    },
    whatsappNumber,
    profileName
  );
  // console.log({ chat });

  systemTemplate.content += `\nDatos para elaborar respuesta:\n${similitudes}`;

  // console.log({ systemTemplate });

  const chatCompletado = await completarChat(
    whatsappNumber,
    profileName,
    [systemTemplate],
    chat
  );

  return chatCompletado;
};

// export const postMessage = catchedAsync(async (req: Request, res: Response) => {
//   let { WaId, Body, ProfileName, MediaContentType0, MediaUrl0 } = req.body;
// });
