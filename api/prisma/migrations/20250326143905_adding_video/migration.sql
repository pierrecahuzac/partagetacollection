/*
  Warnings:

  - The `format` column on the `Audio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ExternalResource` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AudioFormat" AS ENUM ('Vinyle', 'CD', 'Cassette');

-- CreateEnum
CREATE TYPE "PlatformFormat" AS ENUM ('BLURAY', 'K7', 'DVD', 'LASERDISC');

-- DropForeignKey
ALTER TABLE "ExternalResource" DROP CONSTRAINT "ExternalResource_itemId_fkey";

-- AlterTable
ALTER TABLE "Audio" DROP COLUMN "format",
ADD COLUMN     "format" "AudioFormat" NOT NULL DEFAULT 'CD';

-- DropTable
DROP TABLE "ExternalResource";

-- DropEnum
DROP TYPE "ResourceType";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "platform" "PlatformFormat" NOT NULL,
    "editor" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_itemId_key" ON "Video"("itemId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
