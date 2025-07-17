/*
  Warnings:

  - You are about to drop the `collection_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `like_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection_item" DROP CONSTRAINT "collection_item_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "collection_item" DROP CONSTRAINT "collection_item_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "collection_item" DROP CONSTRAINT "collection_item_itemId_fkey";

-- DropForeignKey
ALTER TABLE "collection_item" DROP CONSTRAINT "collection_item_statusId_fkey";

-- DropForeignKey
ALTER TABLE "collection_item" DROP CONSTRAINT "collection_item_userId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_collectionItemId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_itemId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_userId_fkey";

-- DropForeignKey
ALTER TABLE "like_item" DROP CONSTRAINT "like_item_itemId_fkey";

-- DropForeignKey
ALTER TABLE "like_item" DROP CONSTRAINT "like_item_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_relation" DROP CONSTRAINT "user_relation_user_1_id_fkey";

-- DropForeignKey
ALTER TABLE "user_relation" DROP CONSTRAINT "user_relation_user_2_id_fkey";

-- DropTable
DROP TABLE "collection_item";

-- DropTable
DROP TABLE "image";

-- DropTable
DROP TABLE "like_item";

-- DropTable
DROP TABLE "user_relation";

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pricePaid" DOUBLE PRECISION,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "conditionId" TEXT,
    "statusId" TEXT NOT NULL,
    "notes" TEXT,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "itemId" TEXT,
    "collectionId" TEXT,
    "userId" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collectionItemId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRelation" (
    "id" TEXT NOT NULL,
    "user_1_id" TEXT NOT NULL,
    "user_2_id" TEXT NOT NULL,
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_validation" TIMESTAMP(3),
    "status" "UserRelationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "UserRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CollectionItem_collectionId_idx" ON "CollectionItem"("collectionId");

-- CreateIndex
CREATE INDEX "CollectionItem_itemId_idx" ON "CollectionItem"("itemId");

-- CreateIndex
CREATE INDEX "CollectionItem_userId_idx" ON "CollectionItem"("userId");

-- CreateIndex
CREATE INDEX "Image_itemId_idx" ON "Image"("itemId");

-- CreateIndex
CREATE INDEX "Image_collectionId_idx" ON "Image"("collectionId");

-- CreateIndex
CREATE INDEX "Image_collectionItemId_idx" ON "Image"("collectionItemId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRelation_user_1_id_user_2_id_key" ON "UserRelation"("user_1_id", "user_2_id");

-- CreateIndex
CREATE UNIQUE INDEX "LikeItem_userId_itemId_key" ON "LikeItem"("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CollectionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_collectionItemId_fkey" FOREIGN KEY ("collectionItemId") REFERENCES "CollectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_user_1_id_fkey" FOREIGN KEY ("user_1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_user_2_id_fkey" FOREIGN KEY ("user_2_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeItem" ADD CONSTRAINT "LikeItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeItem" ADD CONSTRAINT "LikeItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
