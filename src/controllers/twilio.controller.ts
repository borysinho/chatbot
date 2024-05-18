import { Request, Response } from "express";
import { twiml } from "twilio";
import { HttpException, catchedAsync, response } from "../utils";
import openAi from "../objects/ia.object";
import twilio from "../objects/twilio.object";
import {
  srvCreateUser,
  srvGetWithFullPhoneNumber,
  srvUpdateUser,
  srvIASend,
} from "../services";
import { User } from "@prisma/client";
import { ListMessagesFromNumber } from "../services/twilio.service";

const MessagingResponse = twiml.MessagingResponse;

export const newMessage = catchedAsync(async (req: Request, res: Response) => {
  const { WaId, Body, ProfileName } = req.body;

  console.log(WaId);

  const chatHistory = await ListMessagesFromNumber(WaId);

  const searchedUser = await srvGetWithFullPhoneNumber(WaId);

  let user: User;

  // Si el usuario no está registrado o si el ProfileName ha cambiado
  if (searchedUser && searchedUser.name !== ProfileName) {
    // Actualizamos el nombre del usuario al ProfileName
    user = await srvUpdateUser(
      searchedUser.countrycode,
      searchedUser.cellphone,
      {
        name: ProfileName,
      }
    );
  } else {
    // Si NO existe el usuario
    if (!searchedUser) {
      // Creamos el usuario
      const code = await twilio.lookups.v1.phoneNumbers(WaId).fetch();

      const { nationalFormat, phoneNumber } = code;
      const dif = phoneNumber.length - nationalFormat.length - 1;
      console.log({ dif });
      const countryCode = phoneNumber.substring(1, dif + 1);

      user = await srvCreateUser({
        countrycode: parseInt(countryCode),
        cellphone: parseInt(nationalFormat),
        name: ProfileName,
      });
    } else {
      // El usuario existe pero el nombre del perfil sigue igual entonces no hacemos nada
      user = searchedUser;
    }
  }
  console.log({ user });
  // Enviamos mensaje a la API de la IA
  if (!user) {
    throw new HttpException(400, "No se pudo obtener el usuario");
  }

  // Groq
  console.log({ user: user.name || "" });
  const chatCompletion = await srvIASend(
    user.name || "",
    Body,
    chatHistory || []
  );

  console.log({ chatCompletion });

  // Preparamos una respuesta para Twilio
  const msgRes = new MessagingResponse();
  msgRes.message(chatCompletion.choices[0]?.message?.content || "");

  // Respondemos con la respuesta obtenida
  res.send(msgRes.toString());
});
