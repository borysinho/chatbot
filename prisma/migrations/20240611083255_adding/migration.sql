-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "embedding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PaquetesEmbeddings" ALTER COLUMN "embedding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductosEmbeddings" ALTER COLUMN "embedding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiciosEmbeddings" ALTER COLUMN "embedding" DROP NOT NULL;
