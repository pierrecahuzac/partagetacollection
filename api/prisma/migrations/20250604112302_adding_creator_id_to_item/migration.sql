/*
  Warnings:

  - Added the required column `creatorId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "creatorId" TEXT NOT NULL;
