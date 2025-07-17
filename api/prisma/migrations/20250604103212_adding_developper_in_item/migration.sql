/*
  Warnings:

  - You are about to drop the column `formatTypeId` on the `Collection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_formatTypeId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "formatTypeId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "developper" TEXT;
