-- AlterTable
ALTER TABLE "FormatType" ADD COLUMN     "collectionId" TEXT;

-- AddForeignKey
ALTER TABLE "FormatType" ADD CONSTRAINT "FormatType_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
