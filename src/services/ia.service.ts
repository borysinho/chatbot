import { APIError } from "groq-sdk";
import groq from "../objects/ia.object";
import { HttpException } from "../utils";
import { srvInsertarMensajeChat } from "./chat.service";

export const srvIASend = async (
  name: string,
  content: string,
  chatHistory: Array<any>
) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `El usuario ${name} te esta escribiendo, responde con respuestas personalizadas, toma en cuenta que el usuario se ha comunicado contigo antes. Aquí te paso el historial de mensajes que te ha enviado: ${chatHistory}`,
      },
      {
        role: "user",
        content,
        name,
      },
    ],
    model: "mixtral-8x7b-32768",
    // This ensures reproducibility. With the same seed value, the model will generate the same or similar text sequence for a given input. It’s handy for testing and comparing model behavior.
    seed: 10,
    // 2000 Tokens, this is a fairly high limit, so longer texts are allowed. It’s great for applications that need detailed responses, like writing articles, reports, or stories. However, generating such a long sequence might increase computational demands and processing time.
    max_tokens: 1024,
    // A low temperature value like this biases the model towards more predictable, less varied text. It’s great for technical documentation or specific factual answers, where accuracy and relevance are more important than creativity.
    temperature: 0.2,
    // With this setting, tokens that cumulatively make up 80% of the probability mass are taken into account, which allows for a moderate level of creativity and variability. It’s a good balance that can keep the text coherent while adding diversity.
    top_p: 0.8,

    // })
    // .catch(async (err) => {
    //   if (err instanceof APIError) {
    //     console.log(err.message); // 'Bad Request'
    //     console.log(err.status); // 400
    //     console.log(err.name); // BadRequestError
    //     console.log(err.headers); // {server: 'nginx', ...}
    //     return new HttpException(err.status || 400, err.message);
    //   } else {
    //     throw err;
    //   }
  });
  return completion;
};

// const systemMessage = [
//   {
//     role: "system",
//     content: `Eres una IA que pricipalmente vende servicios y productos de Weeding Planner, pero también vende servicios y productos individuales.
//     No debes especificar las cantidades de los productos o servicios existentes, en su lugar, consulta al usuario de manera educada cuántos desea.
//     En caso de que consulten por un producto o servicio que no exista, debes responder que no se encuentra disponible y ofrecer productos o servicios similares.`,
//   },
// ];

type CompletionMessageType = {
  role: string;
  content: string;
};

export async function completarChat(
  whatsappNumber: string,
  nombreUsuario: string,
  systemTemplate: CompletionMessageType[],
  historialChat: CompletionMessageType[]
) {
  // const messages: CompletionMessageType[] = [];

  // console.log({ messages });
  const messages = systemTemplate.concat(historialChat);

  const chatCompletion = await groq.chat.completions.create({
    messages,
    model: "mixtral-8x7b-32768",
    temperature: 0,
    max_tokens: 150,
    top_p: 0,
    stream: false,
    stop: null,
    user: nombreUsuario,
  });

  return chatCompletion;
}

// main();
