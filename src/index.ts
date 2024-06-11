import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import Routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { obtenerEmbedding } from "./services/embeddings.productos.service";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
    this.setErrorMiddleware(app);
  }

  private config(app: Application): void {
    // const corsOptions: CorsOptions = {
    // origin: process.env.ORIGIN || "http://localhost:3000",

    // };

    // app.use(cors(corsOptions));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private setErrorMiddleware(app: Application): void {
    app.use(errorMiddleware);
  }
}

export const testEmbedding = async () => {
  // const result = await obtenerEmbedding("Paquete Esencial. Precio: 7000 BS");
  // console.log(require("util").inspect(result, { depth: null }));
};

// testEmbedding();
