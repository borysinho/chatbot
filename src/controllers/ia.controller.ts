import { Request, Response } from "express";
import { catchedAsync, response } from "../utils";
import { srvIASend } from "../services";

export const ctrlSendMessage = catchedAsync(
  async (req: Request, res: Response) => {
    const chatCompletion = await srvIASend(
      "Borys",
      "Hola buen día, ¿cómo estás?"
    );
    console.log({
      Respuesta: chatCompletion.choices[0]?.message?.content || "",
    });
    response(res, 200, chatCompletion);
  }
);
