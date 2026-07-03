/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[num]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "num" DROP DEFAULT,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pokemon_num_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_num_key" ON "Pokemon"("num");
