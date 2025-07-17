-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_statusId_fkey";

-- AlterTable
ALTER TABLE "CollectionItem" ADD COLUMN     "collectionStatusId" TEXT;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionStatusId_fkey" FOREIGN KEY ("collectionStatusId") REFERENCES "CollectionStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
