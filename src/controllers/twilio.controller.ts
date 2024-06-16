import { Request, Response } from "express";
import { sendWhatsappMessage } from "../services/twilio.service";
import { twiml } from "twilio";
import { HttpException, catchedAsync, response } from "../utils";
import {
  srvChatToEmbeddings,
  srvInsertarChat,
  srvObtenerChat,
} from "../services/db/chat.service";
import {
  CompletionMessageType,
  completarChat,
  openAICompletion,
  systemContext,
} from "../services/completions.service";
import { embeberDocumento } from "../services/embeddings.service";
import { srvObtenerProductoEmbedding } from "../services/db/productos.service";
import { srvObtenerDocumentos } from "../services/db/documents.service";
import { Role } from "@prisma/client";

//==============================

export const newMessage = catchedAsync(async (req: Request, res: Response) => {
  let {
    WaId: whatsappNumber,
    Body: mensaje,
    ProfileName: profileName,
    MediaContentType0,
    MediaUrl0,
  } = req.body;

  // Convertimos a embeddings el texto del usuario
  const textoUsuarioEmbedding = await embeberDocumento("user-text", [mensaje]);

  //Insertamos chat
  const chat = await srvInsertarChat(
    mensaje,
    whatsappNumber,
    profileName,
<<<<<<< HEAD
    [content(profileName)],
    userChat
=======
    "user"
>>>>>>> system-messages
  );

  // console.log({ chat });

  // Realizamos búsqueda semántica en documentos
  const documentos = await srvObtenerDocumentos(
    textoUsuarioEmbedding.data[0].embedding
  );

  const contexto: string[] = documentos.map((documento) => {
    return documento.descripcion;
  });

  // console.log({ documentos });
  // Validamos el resultado de los documentos
  const aux = documentos.map(({ ref_id, clase, descripcion }) => ({
    ref_id,
    clase,
    descripcion,
  }));

  console.log({ aux });

  // Obtenemos 2 mensajes de conversación relacionados
  const chatEmbeddings = await srvObtenerChat(
    chat.cliente_id,
    textoUsuarioEmbedding.data[0].embedding
  );

  const chatBuscado: CompletionMessageType[] = chatEmbeddings.map((data) => {
    return {
      role: data.role,
      content: data.descripcion,
    };
  });

  console.log({ chatBuscado });

  // Luego de haber buscado las conversaciones relacionadas, registramos el embedding
  const count = await srvChatToEmbeddings({
    cliente_id: chat.cliente_id,
    chat_id: chat.chat_id,
    role: chat.role,
    content: chat.content,
    embedding: textoUsuarioEmbedding.data[0].embedding,
  });

  const chatRespuestaIA = await completarChat(
    whatsappNumber,
    profileName,
    [
      {
        role: "system",
        content: systemContext(contexto),
      },
    ],
    chatBuscado,
    mensaje
  );

  // Registramos el chat en la base de datos
  const chatAssistant = await srvInsertarChat(
    chatRespuestaIA.choices[0].message.content,
    whatsappNumber,
    profileName,
    Role.assistant
  );

  const chatAssistantVector = await embeberDocumento("assistant-text", [
    chatRespuestaIA.choices[0].message.content,
  ]);

  // Registramos los embeddings
  const chatAssistantEmbeddings = await srvChatToEmbeddings({
    cliente_id: chat.cliente_id,
    chat_id: chatAssistant.chat_id,
    role: chatAssistant.role,
    content: chatAssistant.content,
    embedding: chatAssistantVector.data[0].embedding,
  });

  // Enviamos respuesta a Twilio
  await sendWhatsappMessage(
    whatsappNumber,
    chatRespuestaIA.choices[0].message.content
  );

  response(res, 200, { message: "Mensaje enviado" });
});
<<<<<<< HEAD

type CompletionMessageType = {
  role: string;
  content: string;
};

const content = (nombre: string) => {
  const mensaje: CompletionMessageType = {
    role: "system",
    content: `Eres un asistente de ventas
A continuación se detallan los productos que están a la venta:    
`,
  };
  return mensaje;
};

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
Cuando Paul no encuentra un producto o servicio en el catálogo
CATALOGO_IMP le promete al cliente que lo conseguirá para la siguiente semana
Paul nunca revela que es una IA
Paul nunca menciona el nombre del catálogo
Paul es sarcástico cuando le preguntan cosas que no tienen nada que ver con la noche de bodas.
Paul nunca se sale de sus características.
-- Fin de características --

El cliente Borys acaba de escribirle a Paul.

Este es el catálogo CATALOGO_IMP:
Cada producto está dentro de los corchetes []`,
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

  // systemTemplate.content += `\nDatos para elaborar respuesta:\n${similitudes}`;

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
=======
>>>>>>> system-messages
