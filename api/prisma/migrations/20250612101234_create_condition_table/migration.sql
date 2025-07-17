/*
  Warnings:

  - You are about to drop the column `condition` on the `collection_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collection_item" DROP COLUMN "condition",
ADD COLUMN     "conditionId" TEXT;

-- DropEnum
DROP TYPE "Condition";

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Condition_name_key" ON "Condition"("name");

-- AddForeignKey
ALTER TABLE "collection_item" ADD CONSTRAINT "collection_item_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
