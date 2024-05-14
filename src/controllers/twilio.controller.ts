import { Request, Response } from "express";
import { Twilio, twiml } from "twilio";
import { catchedAsync, response } from "../utils";

const MessagingResponse = twiml.MessagingResponse;

export const newMessage = catchedAsync(async (req: Request, res: Response) => {
  console.log({ body: req.body });
  const msgRes = new MessagingResponse();
  msgRes.message("The Robots are coming! Head for the hills!");

  console.log({ msgRes });

  res.send(msgRes.toString());

  // response(res, 200, msgRes.toString());
});
