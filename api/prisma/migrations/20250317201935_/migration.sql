/*
  Warnings:

  - You are about to drop the column `startingAt` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `startedAt` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "startingAt",
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL;
