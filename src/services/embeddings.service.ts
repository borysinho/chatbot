import {
  writeFileSync,
  readFileSync,
  access,
  mkdirSync,
  readSync,
  accessSync,
  readdirSync,
} from "fs";
import { embeddings500 } from "../objects/embeddings.object";
import {
  srvPaqueteDescripcionToArrayString,
  srvPaquetePrecioToArraString,
} from "./db/paquetes.service";
import {
  srvProdDescrToString,
  srvProdPrecioToString,
} from "./db/productos.service";
import {
  srvServiciosDescToString,
  srvServiciosPrecioToString,
} from "./db/servicios.service";
import {
  PaquetesEmbeddings,
  ProductosEmbeddings,
  ServiciosEmbeddings,
} from "@prisma/client";

export const embeberDocumento = async (input: string[]) => {
  console.log(`Embebiendo ${input.length} documentos...`);
  const vectors = await embeddings500.embedDocuments(input);
  return vectors;
};

const JSONToFile = (obj: Object, filename: string) =>
  writeFileSync(
    `./src/data/vectors/${filename}.json`,
    JSON.stringify(obj, null, 2),
    "utf8"
  );

const FileToJSON = async (folder: string, filename: string) =>
  await JSON.parse(readFileSync(`${folder}${filename}.json`, "utf8"));

const existenArchivos = (folder: string) => {
  try {
    const fileList = readdirSync(folder);
    return fileList.length > 0;
  } catch (error) {
    return false;
  }
};

const exportarData = async (data: any, folder: string, filename: string) => {
  try {
    access(folder, (err) => {
      if (err) {
        mkdirSync(folder);
      }
    });
    JSONToFile(data, filename);
  } catch (error) {
    console.error(error);
  }
};

const folder = "./src/data/vectors/";

export const generarEmbeddingsProductos = async () => {
  let prodDesc: ProductosEmbeddings[];
  let prodPrecio: ProductosEmbeddings[];
  let servDesc: ServiciosEmbeddings[];
  let servPrecio: ServiciosEmbeddings[];
  let paqDesc: PaquetesEmbeddings[];
  let paqPrecio: PaquetesEmbeddings[];

  if (!existenArchivos(folder)) {
    try {
      console.log("Generando archivos JSON...");
      prodDesc = await srvProdDescrToString();
      prodPrecio = await srvProdPrecioToString();
      servDesc = await srvServiciosDescToString();
      servPrecio = await srvServiciosPrecioToString();
      paqDesc = await srvPaqueteDescripcionToArrayString();
      paqPrecio = await srvPaquetePrecioToArraString();

      await embeberDocumento(prodDesc.map((prod) => prod.descripcion)).then(
        (vectors) => {
          prodDesc = prodDesc.map((prod, i) => ({
            ...prod,
            embedding: vectors[i],
          }));
        }
      );

      await embeberDocumento(prodPrecio.map((prod) => prod.descripcion)).then(
        (vectors) => {
          prodPrecio = prodPrecio.map((prod, i) => ({
            ...prod,
            embedding: vectors[i],
          }));
        }
      );

      await embeberDocumento(servDesc.map((serv) => serv.descripcion)).then(
        (vectors) => {
          servDesc = servDesc.map((serv, i) => ({
            ...serv,
            embedding: vectors[i],
          }));
        }
      );

      await embeberDocumento(servPrecio.map((serv) => serv.descripcion)).then(
        (vectors) => {
          servPrecio = servPrecio.map((serv, i) => ({
            ...serv,
            embedding: vectors[i],
          }));
        }
      );

      await embeberDocumento(paqDesc.map((paq) => paq.descripcion)).then(
        (vectors) => {
          paqDesc = paqDesc.map((paq, i) => ({
            ...paq,
            embedding: vectors[i],
          }));
        }
      );

      await embeberDocumento(paqPrecio.map((paq) => paq.descripcion)).then(
        (vectors) => {
          paqPrecio = paqPrecio.map((paq, i) => ({
            ...paq,
            embedding: vectors[i],
          }));
        }
      );

      

      await exportarData(prodDesc, folder, "ProductoDescripcion.JSON");
      await exportarData(prodPrecio, folder, "ProductoPrecio.JSON");

      await exportarData(servDesc, folder, "ServicioDescripcion.JSON");
      await exportarData(servPrecio, folder, "ServicioPrecio.JSON");

      await exportarData(paqDesc, folder, "PaqueteDescripcion.JSON");
      await exportarData(paqPrecio, folder, "PaquetePrecio.JSON");
    } catch (error) {
      console.error(error);
      return error;
    }
  } else {
    console.log("Archivos JSON ya existen");
  }
};
