import { Router } from "express";
import { newMessage } from "../controllers/twilio.controller";
import { ctrlSendMessage } from "../controllers/ia.controller";

class TwilioRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req, res) => {
      res.send("Hello World!");
    });
    this.router.post("/ia", newMessage);
    this.router.get("/statuscallback", (req, res) => {
      console.log({ CallBack: req.body });
      res.send("OK");
    });
    this, this.router.post("/testia", ctrlSendMessage);
  }
}

export default new TwilioRoutes().router;
