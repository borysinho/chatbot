import Grok from "groq-sdk";
import { OpenAI } from "openai";
// import { wrapOpenAI } from "langsmith/wrappers";

export const groq = new Grok({
  apiKey: process.env.GROQ_API_KEY,
});

export const openaiComplettions = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 2,
});

// import { ChatOpenAI } from "@langchain/openai";

// export const chatModel = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   model: "gpt-3.5-turbo",
//   temperature: 0,
// });
