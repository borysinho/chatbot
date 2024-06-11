import embeddingsEndPoint from "../objects/embeddings.object";

export async function obtenerEmbedding(input: string) {
  const endPoint = await embeddingsEndPoint.embeddings.create({
    model: "text-embedding-3-small",
    input,
    encoding_format: "float",
    // dimensions: 3,
  });

  console.log({ endPoint });

  return endPoint;
}

