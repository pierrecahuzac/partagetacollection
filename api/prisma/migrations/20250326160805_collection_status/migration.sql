/*
  Warnings:

  - Added the required column `status` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'FREINDS');

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "status" "CollectionStatus" NOT NULL;
