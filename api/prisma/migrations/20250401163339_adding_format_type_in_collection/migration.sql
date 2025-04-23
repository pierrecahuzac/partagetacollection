/*
  Warnings:

  - You are about to drop the column `collectionId` on the `FormatType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormatType" DROP CONSTRAINT "FormatType_collectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "formatTypeId" TEXT;

-- AlterTable
ALTER TABLE "FormatType" DROP COLUMN "collectionId";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_formatTypeId_fkey" FOREIGN KEY ("formatTypeId") REFERENCES "FormatType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
