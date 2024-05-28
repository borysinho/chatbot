/*
  Warnings:

  - A unique constraint covering the columns `[whatsappNumber]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cliente_whatsappNumber_key" ON "Cliente"("whatsappNumber");
