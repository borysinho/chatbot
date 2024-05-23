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
        content: `El usuario ${name} te esta escribiendo, responde con respuestas personalizadas, toma en cuenta que el usuario se ha comunicado contigo antes. Aquí te paso el historial de mensajes que te ha enviado: ${chatHistory}`,
      },
      {
        role: "user",
        content,
        name,
      },
    ],
    model: "llama3-8b-8192",
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
