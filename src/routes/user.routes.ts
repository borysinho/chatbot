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
    this.router.get("/users", ctrlGetUsers);
    this.router.get("/user", ctrlGetUser);
    this.router.post("/users", ctrlCreateUser);
    this.router.put("/users", ctrlUpdateUser);
    this.router.delete("/users", ctrlDeleteUser);
  }
}

export default new HomeRoutes().router;
