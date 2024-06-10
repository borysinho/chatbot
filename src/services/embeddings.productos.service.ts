// import prisma from "../objects/prisma.object";
import embeddingsEndPoint from "../objects/embeddings.object";
// import { getFormatedDate } from "../utils";
// import pgvector from "pgvector";
// import { Prisma } from "@prisma/client";
// import { srvGetProductoById, srvGetProductos } from "./producto.service";
// import {
//   srvGetJuegoDeProductos,
//   srvGetProductosEnJuegoDeProductos,
// } from "./juego.productos.service";
// import { srvGetcaracteristicas } from "./caracteristicas.service";
// import { srvGetstockPorFecha } from "./stock.por.fecha.service";

export async function obtenerEmbedding(input: string) {
  const endPoint = await embeddingsEndPoint.embeddings.create({
    model: "text-embedding-3-small",
    input,
    encoding_format: "float",
    dimensions: 3,
  });

  return endPoint;
}

// export const generarEmbeddingsProductos = async () => {
//   const productos = await prisma.productos.findMany({
//     include: {
//       unidadDeMedida: true,
//       Caracteristicas: true,
//       StockPorFecha: true,
//     },
//   });

//   let texto: { idProducto: number; descripcion: string }[] = [];

//   //===============PRODUCTOS Y SERVICIOS=================
//   async () => {
//     for (const producto of productos) {
//       /**
//        * 1. Generamos una lista de productos con una descripción sencilla
//        * 2. Generamos una lista de las características de cada producto
//        * 3. Generamos una lista de las fechas de disponibilidad de cada producto
//        */
//       if (producto.esProducto) {
//         // Generamos la descripción del producto
//         let nombre = `Producto a la venta: "${producto.nombre}"`;
//         texto.push({ idProducto: producto.id, descripcion: nombre });

//         let caracteristicas = `Características del producto "${
//           producto.nombre
//         }". ${producto.Caracteristicas.map(
//           (caracteristica) =>
//             `${caracteristica.nombre}: ${caracteristica.valor}`
//         ).join(", ")}`;
//         texto.push({ idProducto: producto.id, descripcion: caracteristicas });

//         let disponibilidades = `El producto ${
//           producto.nombre
//         } tiene un stock de ${producto.stock} ${producto.unidadDeMedida} ${
//           producto.stock === 1
//             ? producto.unidadDeMedida.nombre + " disponible"
//             : producto.unidadDeMedida.nombrePlural + " disponibles"
//         }`;
//         texto.push({ idProducto: producto.id, descripcion: disponibilidades });
//       } else {
//         // Generamos la descripción del servicio
//         let nombre = `Servicio a la venta: "${producto.nombre}"`;
//         texto.push({ idProducto: producto.id, descripcion: nombre });

//         let caracteristicas = `Características del servicio "${
//           producto.nombre
//         }". ${producto.Caracteristicas.map(
//           (caracteristica) =>
//             `${caracteristica.nombre}: ${caracteristica.valor}`
//         ).join(", ")}`;
//         texto.push({ idProducto: producto.id, descripcion: caracteristicas });

//         let disponibilidades = `Disponibilidades del servicio "${
//           producto.nombre
//         }": ${producto.StockPorFecha.map(
//           (stock) =>
//             `En fecha ${getFormatedDate(stock.fecha)} ${
//               stock.stock === 1 ? "queda solo " : "quedan"
//             } ${stock.stock} ${
//               stock.stock === 1
//                 ? producto.unidadDeMedida.nombre + " disponible"
//                 : producto.unidadDeMedida.nombrePlural + " disponibles"
//             }`
//         ).join(", ")}`;
//         disponibilidades +=
//           ". Para el resto de las fechas se tiene disponibilidad total del stock";
//         texto.push({ idProducto: producto.id, descripcion: disponibilidades });
//       }
//       // let caracteristicas = producto.Caracteristicas.map(
//       //   (caracteristica) => `${producto.nombre}: ${caracteristica.nombre}: ${caracteristica.valor}.`
//     }

//     console.log({ SystemMessages: texto });
//   };
//   //==============FIN PRODUCTOS Y SERVICIOS================

//   //================PAQUETES=================
//   async () => {
//     /**
//      * 1. Generamos una lista con el nombre del paquete
//      * 2. Generamos una lista de los productos que conforman el paquete
//      * 3. Generamos una lista indicando el precio del paquete
//      *
//      */

//     const juegoProductos = await srvGetJuegoDeProductos();

//     for (const itemJuegoProductos of juegoProductos) {
//       // Nombre del paquete
//       let nombre = `Paquete de productos: "${itemJuegoProductos.nombre}".`;
//       texto.push({ idProducto: itemJuegoProductos.id, descripcion: nombre });

//       // Lista de los productos que forman el paquete
//       const productosEnJuegoDeProductos =
//         await srvGetProductosEnJuegoDeProductos(itemJuegoProductos.id);

//       let productos = `Productos que conforman el paquete "${
//         itemJuegoProductos.nombre
//       }" y sus respectivas cantidades son:
// ${productosEnJuegoDeProductos
//   .map((producto) => {
//     producto.DetalleJuegoDeProductos.map((detalle) => {
//       return `${producto.nombre}: ${detalle.cantidad} unidades`;
//     }).join(", ");
//   })
//   .join(", ")}`;
//       texto.push({ idProducto: itemJuegoProductos.id, descripcion: productos });

//       let precio = `Precio del paquete "${itemJuegoProductos.nombre}": ${itemJuegoProductos.precio} ${itemJuegoProductos.moneda}`;
//       texto.push({ idProducto: itemJuegoProductos.id, descripcion: precio });
//     }
//   };
//==============FIN PAQUETES================

//===================GUARDAMOS EMBEDDINGS===================

// async () => {
//   let producto = null;
//   for (const item of texto) {
//     if (producto === null || producto.id !== item.idProducto) {
//       producto = await srvGetProductoById(item.idProducto);
//     }

//     // Registramos el embedding del producto
//     if (producto !== null) {
//       const embeddings = await prisma.embeddings.findFirst({
//         where: {
//           idProducto: producto.id,
//         },
//       });

//       // console.log({ productoEmbedding });

//       if (embeddings === null) {
//         const { embedding } = (await obtenerEmbedding(item.descripcion))
//           .data[0];
//         // console.log(require("util").inspect({ embedding }, { depth: null }));
//         // const embedding = [0.63930345, 0.45545435, 0.61955833];
//         //       (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
//         await prisma.$executeRaw`INSERT INTO "Embeddings" ("idProducto", "NombreProducto", "Descripcion", "Embedding") VALUES
//               (${producto.id}, ${producto.nombre}, ${item.descripcion}, ${embedding}::vector)`;
//       }
//     }
//   }
// };

//===================FIN GUARDAMOS EMBEDDINGS===================
// };

// for (const producto of productos) {
//   let detalle = "";
//   if (producto.esServicio) {
//     let caracteristicas = producto.Caracteristicas.map((caracteristica) => {
//       return `${caracteristica.nombre}: ${caracteristica.valor}.`;
//     }).join("\n");

//     caracteristicas = caracteristicas + "\n";

//     detalle = `Servicio ${producto.nombre}: Este servicio tiene un costo unitario de ${producto.precioServicio} ${producto.moneda}. Las características del servicio son:\n${caracteristicas}`;

//     const stockPorFecha = producto.StockPorFecha.map(
//       (stock) =>
//         `Para el ${getFormatedDate(stock.fecha)} ${
//           stock.stock === 1 ? "queda solo " : "quedan"
//         } ${stock.stock} ${
//           stock.stock === 1
//             ? producto.unidadDeMedida.nombre + " disponible."
//             : producto.unidadDeMedida.nombrePlural + " disponibles."
//         }`
//     ).join("\n");

//     if (stockPorFecha.length > 0) {
//       detalle += `La disponibilidad del mismo está basada de acuerdo a reservas, por lo que a las fechas y disponibilidades se detallan a continuación:\n${stockPorFecha}`;
//     }

//     // console.log({ detalle });
//     const productoEmbedding = await prisma.productosEmbeddings.findUnique({
//       where: {
//         idProducto: producto.id,
//       },
//     });

//     // console.log({ productoEmbedding });

//     if (productoEmbedding === null) {
//       // const { embedding } = (await obtenerEmbedding(detalle)).data[0];
//       // console.log(require("util").inspect({ embedding }, { depth: null }));
//       const embedding = [0.63930345, 0.45545435, 0.61955833];
//       //       (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
//       await prisma.$executeRaw`INSERT INTO "ProductosEmbeddings" ("idProducto", "NombreProducto", "Descripcion", "Embedding") VALUES
//       (${producto.id}, ${producto.nombre}, ${detalle}, ${embedding}::vector)`;
//     }
//   }
// }
// };

// export const obtenerSimilitudesSemanticas = async (embedding: number[]) => {
//   // const similitudes = await prisma.$queryRaw`
//   // SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding" FROM "ProductosEmbeddings"
//   // ORDER BY "Embedding" <-> ${embedding}::float[] LIMIT 2`;

//   const embeddingSQL = pgvector.toSql(embedding);
//   // console.log({ embeddingSQL });

//   const similitudes: Embeddings[] = await prisma.$queryRaw`
//   SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding"::text FROM "Embeddings" ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 2`;
//   // -- ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 5`;

//   // const similitudes = await prisma.$queryRaw`
//   // SELECT "idProducto", "NombreProducto", "Descripcion", "Embedding::text" FROM "ProductosEmbeddings"
//   // ORDER BY "Embedding" <-> ${embeddingSQL}::vector LIMIT 5`;

//   // console.log(require("util").inspect({ similitudes }, { depth: null }));

//   const similitudesString: string[] = similitudes.map(
//     (similitud) => `${similitud.Descripcion}"""`
//   );
//   // console.log({ similitudesString });

//   return similitudesString;
//   // return [""];
// };

// const getProductosYCaracteristicas = async (df: DataFrame) => {
//   const filaATexto = (fila: any) => {
//     return;
//   };

//   return dfProductos;
//   //Filtrar [id, nombre, caracteristicas]
// };

const parseProdServCaractToString = async () =>
  // productos: TProductos[],
  // caracteristicas: TCaracteristica[]
  {
    let productoText: string[] = [];

    // const productosALaVenta = productos
    //   .filter((producto) => producto.seVendeComoProducto)
    //   .map((productoVendible) => {
    //     `Producto "${productoVendible.nombre} disponible para la venta". ${
    //       productoVendible.descripcion
    //     }. Sus características son: ${caracteristicas
    //       .filter(
    //         (caracteristica) => productoVendible.id === caracteristica.idProducto
    //       )
    //       .map(
    //         (caracteristica) => `${caracteristica.nombre} ${caracteristica.valor}`
    //       )
    //       .join(", ")}`;
    //   });

    // const productosALaVenta = productos
    //   .filter((producto) => producto.seVendeComoProducto)
    //   .map((productoVendible) => {
    //     const prodCaract = caracteristicas
    //       .filter(
    //         (caracteristica) => productoVendible.id === caracteristica.idProducto
    //       )
    //       .map(
    //         (caracteristica) => `${caracteristica.nombre} ${caracteristica.valor}`
    //       )
    //       .join(", ");
    //     return `Producto "${productoVendible.nombre}". ${
    //       productoVendible.descripcion
    //     }. Sus características son: ${prodCaract}`;
    //   });
    // console.log({ productosALaVenta });
    // return productosALaVenta;

    // for (const producto of productos) {
    //   const prodCaract = caracteristicas
    //     .filter((caracteristica) => producto.id === caracteristica.idProducto)
    //     .map((caracteristica) => `${caracteristica.nombre} ${caracteristica.valor}`).join(", ");

    //   productoText.push(`${producto.seVendeComoProducto ? "Servicio" : "Producto"} "${producto.nombre }". ${producto.descripcion}. Sus características son: ${prodCaract}`);
    //   productoText.push(`${producto.esServicio ? "Servicio" : "Producto"} "${producto.nombre}". Precio: ${producto.precioProducto} ${producto.moneda}.`);

    //   if (producto.esServicio) {
    //     // Agregar stock por fecha
    //     const stock = stockPorFecha.filter((stock) => producto.id === stock.idProducto )
    //       .map((stock) => `Para el ${getFormatedDate(stock.fecha)} ${stock.stock === 1 ? "queda solo" : "quedan"} ${stock.stock} ${stock.stock === 1 ? producto.unidadMedidaSingular : producto.unidadMedidaPlural}`)
    //       .join(", ");
    //     productoText.push(`Servicio ${producto.nombre}. Disponibilidades: ${stock}`)
    //   } else {

    //   }
    //   // productoText.push(`${producto.esServicio ? "Servicio" : "Producto"} "${producto.nombre}". Stock: ${producto.stock} ${producto.stock}.`);
    // }
  };

export const srvLoadEmbeddingsProductos = async () => {
  // const productos = await srvGetFullProductos();
  // const productos = await srvGetProductos();
  // const caracteristicas = await srvGetcaracteristicas();
  // if (productos.length !== 0) {
  //   // console.log({ productos });
  //   const productosCaracteristicas = await parseProdServCaractToString(
  //     productos,
  //     caracteristicas
  //   );
  //   console.log({ productosCaracteristicas });
  // }
};

const test = async () => {
  await srvLoadEmbeddingsProductos();
};

test();
// const df = new DataFrame([{ A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }]);

// console.log(df.toString());
