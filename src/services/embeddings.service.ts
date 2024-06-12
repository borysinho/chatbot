import {
  writeFileSync,
  readFileSync,
  access,
  mkdirSync,
  readSync,
  accessSync,
  readdirSync,
} from "fs";
import { openaiEmbeddings } from "../objects/embeddings.object";
import {
  srvInsertarPaqueteEmbedding,
  srvPaqueteDescripcionToArrayString,
  srvPaquetePrecioToArraString,
} from "./db/paquetes.service";
import {
  srvInsertarProductoEmbedding,
  srvObtenerProductoEmbedding,
  srvProdDescrToString,
  srvProdPrecioToString,
} from "./db/productos.service";
import {
  srvInsertarServicioEmbedding,
  srvServiciosDescToString,
  srvServiciosPrecioToString,
} from "./db/servicios.service";
import { srvInsertarChat } from "./db/chat.service";
import {
  Clientes,
  ProductosEmbeddings,
  Role,
  ServiciosEmbeddings,
} from "@prisma/client";

export const embeberDocumento = async (input: string[]) => {
  console.log(`Embebiendo ${input}`);
  const vectors = await openaiEmbeddings.embeddings.create({
    model: "text-embedding-3-small",
    input,
    encoding_format: "float",
    dimensions: 500,
  });
  // console.log(vectors.data[0].embedding);
  return vectors.data[0].embedding;
};

const JSONToFile = (obj: Object, folder: string, filename: string) =>
  writeFileSync(
    `${folder}${filename}.JSON`,
    JSON.stringify(obj, null, 2),
    "utf8"
  );

const FileToJSON = async (folder: string, filename: string) => {
  return await JSON.parse(readFileSync(`${folder}${filename}.JSON`, "utf8"));
};

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
    JSONToFile(data, folder, filename);
  } catch (error) {
    console.error(error);
  }
};

const folder = "./src/data/vectors/";

// type TProductosEmbeddings = {
//   producto_id: number;
//   descripcion: string;
//   embedding: number[];
// };

// type TServiciosEmbeddings = {
//   servicio_id: number;
//   descripcion: string;
//   embedding: number[];
// };

// type TPackagesEmbeddings = {
//   paquete_id: number;
//   descripcion: string;
//   embedding: number[];
// };

export const parseSQLToVector = async () => {
  let prodDesc: any;
  let prodPrecio: any;
  let servDesc: any;
  let servPrecio: any;
  let paqDesc: any;
  let paqPrecio: any;

  if (!existenArchivos(folder)) {
    try {
      console.log("Generando archivos JSON...");
      prodDesc = await srvProdDescrToString();
      prodPrecio = await srvProdPrecioToString();
      servDesc = await srvServiciosDescToString();
      servPrecio = await srvServiciosPrecioToString();
      paqDesc = await srvPaqueteDescripcionToArrayString();
      paqPrecio = await srvPaquetePrecioToArraString();

      // await embeberDocumento(
      //   prodDesc.map((prod: any) => prod.descripcion)
      // ).then((vectors) => {
      //   prodDesc = prodDesc.map((prod: any, i: any) => ({
      //     ...prod,
      //     embedding: vectors,
      //   }));
      // });
      for (const pxd of prodDesc) {
        const arrayPrueba = await embeberDocumento(pxd.descripcion);
        const cosa = prodPrecio.map((productito: any) => ({
          ...productito,
          embedding: arrayPrueba,
        }));
        console.log({ cosa });
      }

      await embeberDocumento(
        prodPrecio.map((prod: any) => prod.descripcion)
      ).then((vectors) => {
        prodPrecio = prodPrecio.map((prod: any, i: any) => ({
          ...prod,
          embedding: vectors,
        }));
      });

      await embeberDocumento(
        servDesc.map((serv: any) => serv.descripcion)
      ).then((vectors) => {
        servDesc = servDesc.map((serv: any, i: any) => ({
          ...serv,
          embedding: vectors,
        }));
      });

      await embeberDocumento(
        servPrecio.map((serv: any) => serv.descripcion)
      ).then((vectors) => {
        servPrecio = servPrecio.map((serv: any, i: any) => ({
          ...serv,
          embedding: vectors,
        }));
      });

      await embeberDocumento(paqDesc.map((paq: any) => paq.descripcion)).then(
        (vectors) => {
          paqDesc = paqDesc.map((paq: any, i: any) => ({
            ...paq,
            embedding: vectors,
          }));
        }
      );

      await embeberDocumento(paqPrecio.map((paq: any) => paq.descripcion)).then(
        (vectors) => {
          paqPrecio = paqPrecio.map((paq: any, i: any) => ({
            ...paq,
            embedding: vectors,
          }));
        }
      );

      await exportarData(prodDesc, folder, "ProductoDescripcion");
      await exportarData(prodPrecio, folder, "ProductoPrecio");

      await exportarData(servDesc, folder, "ServicioDescripcion");
      await exportarData(servPrecio, folder, "ServicioPrecio");

      await exportarData(paqDesc, folder, "PaqueteDescripcion");
      await exportarData(paqPrecio, folder, "PaquetePrecio");
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  console.log("Archivos JSON ya existen. Cargando BD...");
  prodDesc = await FileToJSON(folder, "ProductoDescripcion");
  prodPrecio = await FileToJSON(folder, "ProductoPrecio");
  servDesc = await FileToJSON(folder, "ServicioDescripcion");
  servPrecio = await FileToJSON(folder, "ServicioPrecio");
  paqDesc = await FileToJSON(folder, "PaqueteDescripcion");
  paqPrecio = await FileToJSON(folder, "PaquetePrecio");

  const prodDescCount = await srvInsertarProductoEmbedding(prodDesc);
  const prodPrecioCount = await srvInsertarProductoEmbedding(prodPrecio);
  const servDescCount = await srvInsertarServicioEmbedding(servDesc);
  const servPrecioCount = await srvInsertarServicioEmbedding(servPrecio);
  const paqDescCount = await srvInsertarPaqueteEmbedding(paqDesc);
  const paqPrecioCount = await srvInsertarPaqueteEmbedding(paqPrecio);

  console.log({
    ProductosDescripcion: prodDescCount,
    ProductosPrecios: prodPrecioCount,
    ServiciosDescripcion: servDescCount,
    ServiciosPrecios: servPrecioCount,
    PaquetesDescripcion: paqDescCount,
    PaquetesPrecios: paqPrecioCount,
  });
};

// export const registrarChat = async (
//   textoUsuario: string,
//   cliente: { whatsappNumber: string; profileName: string, role: Role }
// ) => {
//   const chat = await srvInsertarChat(textoUsuario, cliente.whatsappNumber, cliente.profileName, cliente.role);

// };

// export const chatCompletion = async (
//   textoUsuario: string,
//   cliente: { whatsappNumber: string; profileName: string }
// ) => {
//   // Registramos el texto del usuario en la BD y al mismo tiempo generamos los embeddings

// };
