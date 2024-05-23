-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('ssd', 'hdd');

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laptop" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "displayInch" INTEGER NOT NULL,
    "batteryWattHour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laptop_Color" (
    "id_Laptop" INTEGER NOT NULL,
    "id_Color" INTEGER NOT NULL,

    CONSTRAINT "Laptop_Color_pkey" PRIMARY KEY ("id_Color","id_Laptop")
);

-- CreateTable
CREATE TABLE "DefaultMemory" (
    "id" SERIAL NOT NULL,
    "capacityGB" INTEGER NOT NULL,

    CONSTRAINT "DefaultMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Chip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigurableMemory" (
    "id" SERIAL NOT NULL,
    "capacityGB" INTEGER NOT NULL,

    CONSTRAINT "ConfigurableMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model_ConfigurableMemory" (
    "id_ConfigurableMemory" INTEGER NOT NULL,
    "id_Laptop" INTEGER NOT NULL,
    "id_Chip" INTEGER NOT NULL,
    "id_DefaultMemory" INTEGER NOT NULL,

    CONSTRAINT "Model_ConfigurableMemory_pkey" PRIMARY KEY ("id_ConfigurableMemory")
);

-- CreateTable
CREATE TABLE "DefaultStorage" (
    "id" SERIAL NOT NULL,
    "capacityGB" INTEGER NOT NULL,
    "storageType" "StorageType" NOT NULL DEFAULT 'ssd',

    CONSTRAINT "DefaultStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigurableStorage" (
    "id" SERIAL NOT NULL,
    "capacityGB" INTEGER NOT NULL,
    "storageType" "StorageType" NOT NULL DEFAULT 'ssd',
    "id_StorageType" INTEGER NOT NULL,

    CONSTRAINT "ConfigurableStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model_ConfigurableStorage" (
    "id_ConfigurableStorage" INTEGER NOT NULL,
    "id_Laptop" INTEGER NOT NULL,
    "id_Chip" INTEGER NOT NULL,
    "id_DefaultMemory" INTEGER NOT NULL,

    CONSTRAINT "Model_ConfigurableStorage_pkey" PRIMARY KEY ("id_ConfigurableStorage")
);

-- CreateTable
CREATE TABLE "Wireless" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Wireless_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bluetooth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bluetooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "weightKg" INTEGER NOT NULL,
    "id_Laptop" INTEGER NOT NULL,
    "id_Chip" INTEGER NOT NULL,
    "id_DefaultMemory" INTEGER NOT NULL,
    "id_DefaultStorage" INTEGER NOT NULL,
    "id_Wireless" INTEGER NOT NULL,
    "id_Bluetooth" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id_Laptop","id_Chip","id_DefaultMemory")
);

-- AddForeignKey
ALTER TABLE "Laptop_Color" ADD CONSTRAINT "Laptop_Color_id_Laptop_fkey" FOREIGN KEY ("id_Laptop") REFERENCES "Laptop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop_Color" ADD CONSTRAINT "Laptop_Color_id_Color_fkey" FOREIGN KEY ("id_Color") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model_ConfigurableMemory" ADD CONSTRAINT "Model_ConfigurableMemory_id_ConfigurableMemory_fkey" FOREIGN KEY ("id_ConfigurableMemory") REFERENCES "ConfigurableMemory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model_ConfigurableMemory" ADD CONSTRAINT "Model_ConfigurableMemory_id_Laptop_id_Chip_id_DefaultMemor_fkey" FOREIGN KEY ("id_Laptop", "id_Chip", "id_DefaultMemory") REFERENCES "Model"("id_Laptop", "id_Chip", "id_DefaultMemory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model_ConfigurableStorage" ADD CONSTRAINT "Model_ConfigurableStorage_id_ConfigurableStorage_fkey" FOREIGN KEY ("id_ConfigurableStorage") REFERENCES "ConfigurableStorage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model_ConfigurableStorage" ADD CONSTRAINT "Model_ConfigurableStorage_id_Laptop_id_Chip_id_DefaultMemo_fkey" FOREIGN KEY ("id_Laptop", "id_Chip", "id_DefaultMemory") REFERENCES "Model"("id_Laptop", "id_Chip", "id_DefaultMemory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_Laptop_fkey" FOREIGN KEY ("id_Laptop") REFERENCES "Laptop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_Chip_fkey" FOREIGN KEY ("id_Chip") REFERENCES "Chip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_DefaultMemory_fkey" FOREIGN KEY ("id_DefaultMemory") REFERENCES "DefaultMemory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_DefaultStorage_fkey" FOREIGN KEY ("id_DefaultStorage") REFERENCES "DefaultStorage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_Wireless_fkey" FOREIGN KEY ("id_Wireless") REFERENCES "Wireless"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_id_Bluetooth_fkey" FOREIGN KEY ("id_Bluetooth") REFERENCES "Bluetooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
