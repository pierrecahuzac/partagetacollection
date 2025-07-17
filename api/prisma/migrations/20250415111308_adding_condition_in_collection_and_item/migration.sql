-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEUF', 'TRES_BON_ETAT', 'BON_ETAT', 'MOYEN', 'ABIME', 'HS');

-- DropIndex
DROP INDEX "CollectionItem_collectionId_itemId_userId_key";

-- AlterTable
ALTER TABLE "CollectionItem" ADD COLUMN     "condition" "Condition";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "condition" "Condition";
