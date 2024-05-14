/*
  Warnings:

  - A unique constraint covering the columns `[countrycode,cellphone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `cellphone` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "User_cellphone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cellphone",
ADD COLUMN     "cellphone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_countrycode_cellphone_key" ON "User"("countrycode", "cellphone");
