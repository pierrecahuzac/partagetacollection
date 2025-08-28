/*
  Warnings:

  - You are about to drop the column `collectionStatusId` on the `CollectionItem` table. All the data in the column will be lost.
  - Added the required column `visibilityId` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_collectionStatusId_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "visibilityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CollectionItem" DROP COLUMN "collectionStatusId";

-- CreateTable
CREATE TABLE "CollectionVisibility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionVisibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionVisibility_name_key" ON "CollectionVisibility"("name");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_visibilityId_fkey" FOREIGN KEY ("visibilityId") REFERENCES "CollectionVisibility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
