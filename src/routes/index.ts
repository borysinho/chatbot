import { Application } from "express";
import twilioRouter from "./twilio.routes";
import userRouter from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1", twilioRouter);
    app.use("/api/v1", userRouter);
  }
}
