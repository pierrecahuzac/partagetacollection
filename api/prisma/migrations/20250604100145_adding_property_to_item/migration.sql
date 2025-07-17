-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "album" TEXT,
ADD COLUMN     "collection" TEXT,
ADD COLUMN     "isPublic" BOOLEAN DEFAULT false,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER DEFAULT 1,
ADD COLUMN     "style" TEXT;
