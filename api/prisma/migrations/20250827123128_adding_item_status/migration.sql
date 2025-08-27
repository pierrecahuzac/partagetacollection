/*
  Warnings:

  - Added the required column `statusId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemStatusName" AS ENUM ('PUBLIC', 'ARCHIVED', 'SIGNALED', 'DELETED_MODERATOR');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ItemStatus" (
    "id" TEXT NOT NULL,
    "name" "ItemStatusName" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ItemStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatus_name_key" ON "ItemStatus"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ItemStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
