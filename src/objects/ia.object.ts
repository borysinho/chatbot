import Grok from "groq-sdk";

const grok = new Grok({
  apiKey: process.env.IA_API_KEY,
});

export default grok;
