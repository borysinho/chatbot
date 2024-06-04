-- AlterTable
CREATE SEQUENCE productosembeddings_idproductoembedding_seq;
ALTER TABLE "ProductosEmbeddings" ALTER COLUMN "idProductoEmbedding" SET DEFAULT nextval('productosembeddings_idproductoembedding_seq');
ALTER SEQUENCE productosembeddings_idproductoembedding_seq OWNED BY "ProductosEmbeddings"."idProductoEmbedding";
