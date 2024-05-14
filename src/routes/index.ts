import { Application } from "express";
import TwilioRouter from "./twilio.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1", TwilioRouter);
  }
}
