import { Router } from "express";
import { newMessage } from "../controllers/twilio.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req, res) => {
      res.send("Hello World!");
    });
    this.router.post("/whatsapp", newMessage);
    this.router.get("/statuscallback", (req, res) => {
      console.log(req.body);
      res.send("OK");
    });
  }
}

export default new HomeRoutes().router;
