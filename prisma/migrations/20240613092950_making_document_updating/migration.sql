/*
  Warnings:

  - The primary key for the `Documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_pkey",
DROP COLUMN "id",
ADD COLUMN     "document_id" SERIAL NOT NULL,
ADD CONSTRAINT "Documents_pkey" PRIMARY KEY ("document_id");
