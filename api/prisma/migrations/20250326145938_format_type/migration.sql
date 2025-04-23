/*
  Warnings:

  - You are about to drop the column `format` on the `Audio` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Audio" DROP COLUMN "format",
ADD COLUMN     "formatTypeId" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "formatTypeId" TEXT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "platform";

-- AlterTable
ALTER TABLE "VideoGame" ADD COLUMN     "formatTypeId" TEXT;

-- DropEnum
DROP TYPE "AudioFormat";

-- DropEnum
DROP TYPE "PlatformFormat";

-- CreateTable
CREATE TABLE "FormatType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FormatType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormatType_name_key" ON "FormatType"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_formatTypeId_fkey" FOREIGN KEY ("formatTypeId") REFERENCES "FormatType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_formatTypeId_fkey" FOREIGN KEY ("formatTypeId") REFERENCES "FormatType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoGame" ADD CONSTRAINT "VideoGame_formatTypeId_fkey" FOREIGN KEY ("formatTypeId") REFERENCES "FormatType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_id_fkey" FOREIGN KEY ("id") REFERENCES "FormatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
