/*
  Warnings:

  - You are about to drop the column `condition` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Audio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Piece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRelationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_formatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- DropForeignKey
ALTER TABLE "Piece" DROP CONSTRAINT "Piece_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_id_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_itemId_fkey";

-- DropForeignKey
ALTER TABLE "VideoGame" DROP CONSTRAINT "VideoGame_formatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "VideoGame" DROP CONSTRAINT "VideoGame_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "condition",
DROP COLUMN "currency",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "userId",
ADD COLUMN     "artist" TEXT,
ADD COLUMN     "audioDuration" INTEGER,
ADD COLUMN     "author" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "denomination" TEXT,
ADD COLUMN     "director" TEXT,
ADD COLUMN     "gameDeveloper" TEXT,
ADD COLUMN     "gameEditor" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "isbn" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "videoDuration" INTEGER,
ADD COLUMN     "videoEditor" TEXT,
ADD COLUMN     "year" INTEGER;

-- DropTable
DROP TABLE "Audio";

-- DropTable
DROP TABLE "CollectionItem";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Piece";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "VideoGame";

-- CreateTable
CREATE TABLE "collection_item" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pricePaid" DOUBLE PRECISION,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "condition" "Condition",

    CONSTRAINT "collection_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "itemId" TEXT,
    "collectionId" TEXT,
    "userId" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_relation" (
    "id" TEXT NOT NULL,
    "user_1_id" TEXT NOT NULL,
    "user_2_id" TEXT NOT NULL,
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_validation" TIMESTAMP(3),
    "status" "UserRelationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "user_relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_item" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_item_collectionId_itemId_userId_key" ON "collection_item"("collectionId", "itemId", "userId");

-- CreateIndex
CREATE INDEX "image_itemId_idx" ON "image"("itemId");

-- CreateIndex
CREATE INDEX "image_collectionId_idx" ON "image"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_relation_user_1_id_user_2_id_key" ON "user_relation"("user_1_id", "user_2_id");

-- CreateIndex
CREATE UNIQUE INDEX "like_item_userId_itemId_key" ON "like_item"("userId", "itemId");

-- AddForeignKey
ALTER TABLE "collection_item" ADD CONSTRAINT "collection_item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_item" ADD CONSTRAINT "collection_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_item" ADD CONSTRAINT "collection_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relation" ADD CONSTRAINT "user_relation_user_1_id_fkey" FOREIGN KEY ("user_1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relation" ADD CONSTRAINT "user_relation_user_2_id_fkey" FOREIGN KEY ("user_2_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_item" ADD CONSTRAINT "like_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_item" ADD CONSTRAINT "like_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
