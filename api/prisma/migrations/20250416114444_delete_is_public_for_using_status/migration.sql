/*
  Warnings:

  - The values [FREINDS] on the enum `CollectionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isPublic` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Item` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CollectionStatus_new" AS ENUM ('PRIVATE', 'PUBLIC', 'FRIENDS');
ALTER TABLE "Collection" ALTER COLUMN "status" TYPE "CollectionStatus_new" USING ("status"::text::"CollectionStatus_new");
ALTER TYPE "CollectionStatus" RENAME TO "CollectionStatus_old";
ALTER TYPE "CollectionStatus_new" RENAME TO "CollectionStatus";
DROP TYPE "CollectionStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "isPublic";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "isPublic";
