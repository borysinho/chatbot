import { APIError } from "groq-sdk";
import grok from "../objects/ia.object";
import { HttpException } from "../utils";

export const srvIASend = async (
  name: string,
  content: string,
  chatHistory: Array<any>
) => {
  const completion = await grok.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `El usuario ${name} te esta hablando, response con respuestas personalizadas, toma en cuenta que el usuario se ha comunicado contigo antes, aca te paso el historial de mensajes que te ha enviado ${chatHistory}`,
      },
      {
        role: "user",
        content,
        name,
      },
    ],
    model: "llama3-8b-8192",
  });
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
  // });
  return completion;
};
