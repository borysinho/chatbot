import { catchedAsync } from "../utils";
import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import speech from "@google-cloud/speech";
import { SpeechClient } from "@google-cloud/speech";
import { Readable } from "stream";

export const ListMessagesFromNumber = (number: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  return client.messages
    .list({
      from: `whatsapp:+${number}`,
      limit: 20,
    })
    .then((messages: any) => {
      let chatContent: any[] = [];
      messages.forEach((message: any) => {
        chatContent.push(message.body);
      });
      return chatContent;
    });
};

export const DownloadAudio = async (audioUrl: string): Promise<string> => {
  const accountSid: string = process.env.TWILIO_ACCOUNT_SID as string;
  const authToken: string = process.env.TWILIO_AUTH_TOKEN as string;

  if (!accountSid || !authToken) {
    throw new Error(
      "TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be defined in environment variables"
    );
  }

  const audioResponse = await axios.get(audioUrl, {
    auth: {
      username: accountSid,
      password: authToken,
    },
    responseType: "stream",
  });

  const audioFilename = `./audio-${uuidv4()}.mp3`;
  const writer = fs.createWriteStream(audioFilename);

  audioResponse.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  console.log(`Archivo de audio descargado: ${audioFilename}`);
  return audioFilename;
};

export const TranscribeAudio = async (filename: string): Promise<string> => {
  const client = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_CLOUD_API_KEY,
  });

  const file = fs.readFileSync(filename);
  const audioBytes = file.toString("base64");

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: "MP3",
    sampleRateHertz: 16000,
    languageCode: "es-ES",
  };

  const request = {
    audio: audio,
    config: config,
  };

  // Realizar la transcripción
  const [response] = await client.recognize(request);

  // Extraer la transcripción del resultado
  const transcription = response.results
    .map((result: any) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);

  return transcription;
};
