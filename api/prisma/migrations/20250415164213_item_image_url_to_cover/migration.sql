/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "imageURL",
ADD COLUMN     "cover" TEXT;
