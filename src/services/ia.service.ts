import { APIError } from "groq-sdk";
import grok from "../objects/ia.object";
import { HttpException } from "../utils";

export const srvIASend = async (name: string, content: string) => {
  const completion = await grok.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `El nombre del usuario que realiza la consulta es ${name}. Utiliza este nombre para responder de manera correcta`,
      },
      {
        role: "user",
        content,
        name,
      },
    ],
    model: "llama3-8b-8192",
  })
  .catch(async (err) => {
    if (err instanceof APIError) {
      console.log(err.message); // 'Bad Request'
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
      return new HttpException(err.status || 400, err.message);
    } else {
      throw err;
    }
  });
  return completion;
};
