// import { Productos } from "@prisma/client";
// import pgvector from "pgvector";
// import prisma from "../objects/prisma.object";
// import { getFormatedDate } from "./dates.utils";
import groq from "../objects/ia.object";
// import {
//   generarEmbeddingsProductos,
//   completarChat,
//   obtenerEmbedding,
//   obtenerSimilitudesSemanticas,
//   srvInsertarMensajeChat,
// } from "../services";

type CompletionMessageType = {
  role: string;
  content: string;
};

const getGroqChatCompletion = async (
  mensajesDeUsuario: CompletionMessageType[],
  mensajesDeLLM: CompletionMessageType[],
  mensajesParaSistema: CompletionMessageType[],
  preguntaDeUsuario: string
) => {
  const messages: CompletionMessageType[] = mensajesDeUsuario
    .concat(mensajesDeLLM)
    .concat(mensajesParaSistema);

  console.log({ messages });

  return groq.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
      ...messages,
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
    ],
    // The language model which will generate the completion.
    model: "llama3-8b-8192",
    //
    // Optional parameters
    //
    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0,
    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_tokens: 100,
    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    // top_p: 1,
    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    // stop: null,
    // If set, partial message deltas will be sent.
    // stream: false,
  });
};

// while (true) {
//   const readline = require("node:readline");

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   rl.question(`What's your name?`, (name: string) => {
//     console.log(`Hi ${name}!`);
//     rl.close();
//   });
// }

// test("Buen día, estoy buscando sillas", "59177685777", "Borys Quiroga");
