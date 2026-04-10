/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `name` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
DROP COLUMN "id",
DROP COLUMN "nombre",
DROP COLUMN "tipo",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "num" SERIAL NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("num");
