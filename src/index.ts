import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import Routes from "./routes";
// import prompt from "prompt-sync";
import { errorMiddleware } from "./middlewares/error.middleware";
// import {
//   completarChat,
//   // generarEmbeddingsProductos,
//   // obtenerSimilitudesSemanticas,
//   srvInsertarMensajeChat,
// } from "./services";

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

// type CompletionMessageType = {
//   role: string;
//   content: string;
// };

// const systemTemplate: CompletionMessageType = {
//   role: "system",
//   content: `Eres una IA que vende productos y servicios para bodas y eventos sociales.
// 1. Pregunta qué producto o servicio está buscando.
// 2. Busca el producto o servicio del catalogo.
// 3. Si existe, confirma que se cuenta con ese producto indicando únicamente el precio y las características del producto o servicio
// 4. Si no existe, ofrece productos o servicios similares indicando únicamente el precio y las características del producto o servicio
// 5. Si el usuario está interesado, pregunta cuántos desea.
// 6. Si el usuario confirma la cantidad deseada y este es un servicio, pregunta la fecha en la que lo necesita.
// 7. Al indicarte la fecha, verifica si hay disponibilidad para esa fecha y confirma la reserva del servicio.
// 8. Si el usuario está interesado en un producto, verifica si hay stock disponible.
// 9. Si hay stock disponible, pregunta cuántos desea.
// 10. Si el usuario confirma la cantidad deseada, pregunta la dirección de entrega del producto junto a la fecha y hora para agendar la entrega.
// 11. Finaliza la transacción o puede ofrecer productos o servicios adicionales.
// Los productos y servicios junto a sus descripciones estarán delimitados con los siguientes caracteres """`,
// };

// const test = async (
//   mensaje: string,
//   whatsappNumber: string,
//   profileName: string
// ) => {
//   // Cargamos los embeddings de los productos
//   await generarEmbeddingsProductos();

//   // Convertirmos a embeddings el mensaje del usuario
//   // const result = await obtenerEmbedding(mensaje);
//   // const { embedding } = result.data[0];

//   const embedding = [0.028576007, -0.983466, -0.17882407];

//   // console.log({ embedding });

//   const similitudes: string[] = await obtenerSimilitudesSemanticas(embedding);

//   // console.log({ similitudes });

//   // Obtenemos la respuesta de la IA
//   const chat = await srvInsertarMensajeChat(
//     {
//       role: "user",
//       content: mensaje,
//     },
//     whatsappNumber,
//     profileName
//   );
//   // console.log({ chat });

//   systemTemplate.content += `\nDatos para elaborar respuesta:\n${similitudes}`;

//   // console.log({ systemTemplate });

//   const chatCompletado = await completarChat(
//     whatsappNumber,
//     profileName,
//     [systemTemplate],
//     chat
//   );

//   return chatCompletado;
// };

// test("Hola", "59177685777", "Borys Quiroga");
