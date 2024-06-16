import pgvector from "pgvector";
import prisma from "../objects/prisma.object";
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
  srvObtenerPaquetesEmbeddings,
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
  srvObtenerServiciosEmbeddings,
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

export const embeberDocumento = async (
  nombreDocumento: string,
  input: string[]
) => {
  console.log(
    `Embebiendo documento "${nombreDocumento}" de ${input.length} párrafos...`
  );
  const vectors = await openaiEmbeddings.embeddings.create({
    model: "text-embedding-3-small",
    input,
    encoding_format: "float",
    dimensions: 500,
  });

  return vectors;
};

const ObjectToFile = (obj: Object, folder: string, filename: string) =>
  writeFileSync(
    `${folder}${filename}.JSON`,
    JSON.stringify(obj, null, 2),
    "utf8"
  );

const FileToObject = async (folder: string, filename: string) => {
  return await JSON.parse(readFileSync(`${folder}${filename}.JSON`, "utf8"));
};

<<<<<<< HEAD
  for (const producto of productos) {
    let detalle = "";
    // if (producto.esServicio) {
    let caracteristicas = producto.Caracteristicas.map((caracteristica) => {
      return `${caracteristica.nombre}: ${caracteristica.valor}.`;
    }).join("\n");

    caracteristicas = caracteristicas + "\n";

    detalle = `[Servicio ${producto.nombre}: Este servicio tiene un costo unitario de ${producto.precioServicio} ${producto.moneda}. Las características del servicio son:\n${caracteristicas}`;

    const stockPorFecha = producto.StockPorFecha.map(
      (stock) =>
        `Para el ${getFormatedDate(stock.fecha)} ${
          stock.stock === 1 ? "queda solo " : "quedan"
        } ${stock.stock} ${
          stock.stock === 1
            ? producto.unidadDeMedida.nombre + " disponible."
            : producto.unidadDeMedida.nombrePlural + " disponibles."
        }`
    ).join("\n");

    if (stockPorFecha.length > 0) {
      detalle += `La disponibilidad del mismo está basada de acuerdo a reservas, por lo que a las fechas y disponibilidades se detallan a continuación:\n${stockPorFecha}]`;
    }

    // console.log({ detalle });
    const productoEmbedding = await prisma.productosEmbeddings.findUnique({
      where: {
        idProducto: producto.id,
      },
    });

    // console.log({ productoEmbedding });

    if (productoEmbedding === null) {
      const { embedding } = (await obtenerEmbedding(detalle)).data[0];
      // console.log(require("util").inspect({ embedding }, { depth: null }));
      // const embedding = [0.63930345, 0.45545435, 0.61955833];
      //       (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
      await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" ("idProducto", "NombreProducto", "Descripcion", "Embedding") VALUES
        (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
    }
    // }
=======
const existenArchivos = (folder: string) => {
  try {
    const fileList = readdirSync(folder);
    return fileList.length > 0;
  } catch (error) {
    return false;
>>>>>>> system-messages
  }
};

const exportarData = async (data: any, folder: string, filename: string) => {
  try {
    access(folder, (err) => {
      if (err) {
        mkdirSync(folder);
      }
    });
    ObjectToFile(data, folder, filename);
  } catch (error) {
    console.error(error);
  }
};

const folder = "./src/data/vectors/";

const insertarEmbeddingsAObjeto = async (
  nombreDocumento: string,
  objArray: any[]
) => {
  // Generamos un arreglo del tipo [string] únicamente con las descripciones
  const descripcionesArray = objArray.map((obj: any) => obj.descripcion);

  // Obtenemos los embeddings de cada descripción
  const descripcionesEmbeddings = await embeberDocumento(
    nombreDocumento,
    descripcionesArray
  );

  // Insertamos los embeddings en el objeto original
  const result = objArray.map((prod: any, i: any) => ({
    ...prod,
    embedding: descripcionesEmbeddings.data[i].embedding,
  }));

  return result;
};

export const parseSQLToVector = async () => {
  let prodDesc: any;
  let prodPrecio: any;
  let servDesc: any;
  let servPrecio: any;
  let paqDesc: any;
  let paqPrecio: any;

  let recienCargados = false;

  if (!existenArchivos(folder)) {
    try {
      console.log("Generando archivos JSON...");
      // Obtenemos los datos de la BD
      prodDesc = await srvProdDescrToString();
      prodPrecio = await srvProdPrecioToString();
      servDesc = await srvServiciosDescToString();
      servPrecio = await srvServiciosPrecioToString();
      paqDesc = await srvPaqueteDescripcionToArrayString();
      paqPrecio = await srvPaquetePrecioToArraString();

      // Insertamos los embeddings en los objetos
      prodDesc = await insertarEmbeddingsAObjeto(
        "Producto Descripcion",
        prodDesc
      );
      prodPrecio = await insertarEmbeddingsAObjeto(
        "Producto Precio",
        prodPrecio
      );
      servDesc = await insertarEmbeddingsAObjeto(
        "Servicio Descripcion",
        servDesc
      );
      servPrecio = await insertarEmbeddingsAObjeto(
        "Servicio Precio",
        servPrecio
      );
      paqDesc = await insertarEmbeddingsAObjeto("Paquete Descripcion", paqDesc);
      paqPrecio = await insertarEmbeddingsAObjeto("Paquete Precio", paqPrecio);

      // Exportamos los objetos a archivos JSON para su posterior uso
      await exportarData(prodDesc, folder, "ProductoDescripcion");
      await exportarData(prodPrecio, folder, "ProductoPrecio");
      await exportarData(servDesc, folder, "ServicioDescripcion");
      await exportarData(servPrecio, folder, "ServicioPrecio");
      await exportarData(paqDesc, folder, "PaqueteDescripcion");
      await exportarData(paqPrecio, folder, "PaquetePrecio");

      recienCargados = true;

      console.log("Archivos JSON generados.");
    } catch (error) {
      console.error(error);
      return error;
    }
  } else {
    // Si los archivos existen, los cargamos en objetos independientes
    prodDesc = await FileToObject(folder, "ProductoDescripcion");
    prodPrecio = await FileToObject(folder, "ProductoPrecio");
    servDesc = await FileToObject(folder, "ServicioDescripcion");
    servPrecio = await FileToObject(folder, "ServicioPrecio");
    paqDesc = await FileToObject(folder, "PaqueteDescripcion");
    paqPrecio = await FileToObject(folder, "PaquetePrecio");
  }

  // Insertamos los embeddings en la BD en sus correspondientes tablas
  const prodDescCount = await srvInsertarProductoEmbedding(prodDesc);
  const prodPrecioCount = await srvInsertarProductoEmbedding(prodPrecio);
  const servDescCount = await srvInsertarServicioEmbedding(servDesc);
  const servPrecioCount = await srvInsertarServicioEmbedding(servPrecio);
  const paqDescCount = await srvInsertarPaqueteEmbedding(paqDesc);
  const paqPrecioCount = await srvInsertarPaqueteEmbedding(paqPrecio);

  console.log("Datos insertados: /n", {
    ProductosDescripcion: prodDescCount,
    ProductosPrecios: prodPrecioCount,
    ServiciosDescripcion: servDescCount,
    ServiciosPrecios: servPrecioCount,
    PaquetesDescripcion: paqDescCount,
    PaquetesPrecios: paqPrecioCount,
  });
};

export const realizarBusquedaSemantica = async (vector: number[]) => {
  const productos = await srvObtenerProductoEmbedding(vector);
  const servicios = await srvObtenerServiciosEmbeddings(vector);
  const paquetes = await srvObtenerPaquetesEmbeddings(vector);

  return { productos, servicios, paquetes };
};

export const realizarBusquedaSemanticaFiltrada = async (vector: number[]) => {
  const productos = await srvObtenerProductoEmbedding(vector);
  const servicios = await srvObtenerServiciosEmbeddings(vector);
  const paquetes = await srvObtenerPaquetesEmbeddings(vector);

  

  const embedding = pgvector.toSql(vector);

  const similitudes =
    await prisma.$queryRaw`SELECT productoembedding_id, producto_id, descripcion, embedding::text 
    FROM (
      VALUES (${productos[0].descripcion}, ${productos[0].embedding}),
    )
    ORDER BY embedding <-> ${embedding}::vector LIMIT 2`;

  return similitudes;

 
};
