import { Router } from "express";
import {
  ctrlCreateUser,
  ctrlDeleteUser,
  ctrlGetUser,
  ctrlGetUsers,
  ctrlUpdateUser,
} from "../controllers/user.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/usuario", ctrlGetUsers);
    this.router.get("/usuario/:id", ctrlGetUser);
    this.router.post("/usuario", ctrlCreateUser);
    this.router.put("/usuario/:id", ctrlUpdateUser);
    this.router.delete("/usuario/:id", ctrlDeleteUser);
  }
}

export default new HomeRoutes().router;
