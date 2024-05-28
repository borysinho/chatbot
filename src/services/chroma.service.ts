import chromaClient from "../objects/chroma.object";
import { catchedAsync } from "../utils";

export const crearColeccion = async (nombreColeccion: string) => {
  const coleccion = await chromaClient.createCollection({
    name: nombreColeccion,
  });
  return coleccion;
};

export const listarColecciones = async () => {
  const colecciones = await chromaClient.listCollections();
  return colecciones;
};

export const eliminarColeccion = async (nombreColeccion: string) => {
  const coleccion = await chromaClient.deleteCollection({
    name: nombreColeccion,
  });
  return coleccion;
};

export const obtenerColeccion = async (nombreColeccion: string) => {
  const coleccion = await chromaClient.getCollection({
    name: nombreColeccion,
  });
  return coleccion;
};
export const agregarDocumento = async (
  nombreColeccion: string,
  documento: any[],
  ids: any[]
) => {
  const coleccion = await obtenerColeccion(nombreColeccion);
  await coleccion.add({
    ids,
    documents: documento,
  });
};

export const consultarColeccion = async (
  nombreColeccion: string,
  consulta: any[],
  cantidadResultados: number
) => {
  const coleccion = await obtenerColeccion(nombreColeccion);
  const resultado = await coleccion.query({
    queryTexts: consulta,
    nResults: cantidadResultados,
  });
};
