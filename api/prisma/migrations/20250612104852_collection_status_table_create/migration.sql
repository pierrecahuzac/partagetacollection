/*
  Warnings:

  - You are about to drop the column `status` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `collection_item` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `collection_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "status",
ADD COLUMN     "statusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "collection_item" DROP COLUMN "status",
ADD COLUMN     "statusId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CollectionStatus";

-- CreateTable
CREATE TABLE "CollectionStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionStatus_name_key" ON "CollectionStatus"("name");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CollectionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_item" ADD CONSTRAINT "collection_item_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CollectionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
