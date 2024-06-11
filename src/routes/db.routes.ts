import { Router } from "express";
import {
  ctrlCargarEmbeddings,
  ctrlObtenerDatos,
} from "../controllers/db.controller";

class DBRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/data", ctrlObtenerDatos);
    this.router.post("/load", ctrlCargarEmbeddings);
  }
}

export default new DBRoutes().router;
