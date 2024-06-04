import { Request, Response } from "express";
import { twiml } from "twilio";
import { HttpException, catchedAsync, response } from "../utils";
import twilio from "../objects/twilio.object";
import {
  srvCreatecliente,
  srvIASend,
  srvUpdateClienteWhatsapp,
} from "../services";
import { Cliente } from "@prisma/client";
import {
  DownloadAudio,
  ListMessagesFromNumber,
  TranscribeAudio,
  uploadAudio,
} from "../services/twilio.service";

import axios from "axios";

const MessagingResponse = twiml.MessagingResponse;

export const newMessage = catchedAsync(async (req: Request, res: Response) => {
  let { WaId, Body, ProfileName, MediaContentType0, MediaUrl0 } = req.body;

  console.log(WaId);

  const chatHistory = await ListMessagesFromNumber(WaId);

  const searchedUser = WaId;

  let Cliente: Cliente;

  // Si el usuario no está registrado o si el ProfileName ha cambiado
  if (searchedUser && searchedUser.name !== ProfileName) {
    // Actualizamos el nombre del usuario al ProfileName
    Cliente = await srvUpdateClienteWhatsapp(WaId, {
      profileName: ProfileName,
    });
  } else {
    // Si NO existe el usuario
    if (!searchedUser) {
      // Creamos el usuario
      const code = await twilio.lookups.v1.phoneNumbers(WaId).fetch();

      const { nationalFormat, phoneNumber } = code;
      const dif = phoneNumber.length - nationalFormat.length - 1;
      console.log({ dif });
      const countryCode = phoneNumber.substring(1, dif + 1);

      Cliente = await srvCreatecliente({
        whatsappNumber: WaId,
        profileName: ProfileName,
      });
    } else {
      // El usuario existe pero el nombre del perfil sigue igual entonces no hacemos nada
      Cliente = searchedUser;
    }
  }
  console.log({ Cliente });
  // Enviamos mensaje a la API de la IA
  if (!Cliente) {
    throw new HttpException(400, "No se pudo obtener el usuario");
  }
  console.log({ user: Cliente.nombre || "" });

  if (MediaContentType0 && MediaContentType0.startsWith("audio/")) {
    const audioUrl = MediaUrl0;

    const audioFilename = await DownloadAudio(audioUrl);
    const audioUrlCloud = await uploadAudio(audioFilename);
    String(audioUrlCloud);
    const transcribedAudio = await TranscribeAudio(audioUrlCloud);

    Body = transcribedAudio;
  }

  const chatCompletion = await srvIASend(
    Cliente.nombre || "",
    Body,
    chatHistory || []
  );

  console.log(chatCompletion.choices[0]?.message?.content);

  //seria bueno mover esto a otra carpeta
  function getWordsCount(text: string) {
    if (!text) return 0;
    return text.split(/\s+/).length;
  }

  /*  function calculateTime(length: number){
    if(!length) return 0;
    return 
  } */

  // Preparamos una respuesta para Twilio
  const msgRes = new MessagingResponse();
  msgRes.message(chatCompletion.choices[0]?.message?.content || "");

  // Respondemos con la respuesta obtenida
  res.send(msgRes.toString());
});
