/*
  Warnings:

  - Added the required column `updatedAt` to the `collection_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "collection_item_collectionId_itemId_userId_key";

-- AlterTable
ALTER TABLE "collection_item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "CollectionStatus" NOT NULL DEFAULT 'PRIVATE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "collectionItemId" TEXT;

-- CreateIndex
CREATE INDEX "image_collectionItemId_idx" ON "image"("collectionItemId");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_collectionItemId_fkey" FOREIGN KEY ("collectionItemId") REFERENCES "collection_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
