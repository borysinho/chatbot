/*
  Warnings:

  - The values [Bot] on the enum `Remitente` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Remitente_new" AS ENUM ('Cliente', 'IA');
ALTER TABLE "Chat" ALTER COLUMN "remitente" TYPE "Remitente_new" USING ("remitente"::text::"Remitente_new");
ALTER TYPE "Remitente" RENAME TO "Remitente_old";
ALTER TYPE "Remitente_new" RENAME TO "Remitente";
DROP TYPE "Remitente_old";
COMMIT;
