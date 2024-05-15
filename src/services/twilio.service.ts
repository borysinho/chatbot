import { catchedAsync } from "../utils";

export const ListMessagesFromNumber = (number: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  return client.messages
    .list({
      from: `whatsapp:+${number}`,
      limit: 15,
    })
    .then((messages: any) => {
      let chatContent: any[] = [];
      messages.forEach((message: any) => {
        chatContent.push(message.body);
      });
      return chatContent;
    });
};
