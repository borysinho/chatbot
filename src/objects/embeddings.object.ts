import OpenAI from "openai";

export default new OpenAI({
  apiKey: process.env.OPENAI_EMBEDDINGS_API_KEY,
  maxRetries: 2,
});
