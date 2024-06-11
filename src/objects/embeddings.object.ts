import OpenAI from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_EMBEDDINGS_API_KEY,
  maxRetries: 2,
});

export const embeddings500 = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  dimensions: 500,
  apiKey: process.env.OPENAI_EMBEDDINGS_API_KEY,
});
