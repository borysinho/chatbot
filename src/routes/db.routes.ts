import { Router } from "express";
import { ctrlObtenerDatos } from "../controllers/db.controller";

class DBRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/data", ctrlObtenerDatos);
    
  }
}

export default new DBRoutes().router;
