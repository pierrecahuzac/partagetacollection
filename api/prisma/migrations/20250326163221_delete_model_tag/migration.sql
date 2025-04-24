/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToTag" DROP CONSTRAINT "_CollectionToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToTag" DROP CONSTRAINT "_CollectionToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToTag" DROP CONSTRAINT "_ItemToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToTag" DROP CONSTRAINT "_ItemToTag_B_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_CollectionToTag";

-- DropTable
DROP TABLE "_ItemToTag";
