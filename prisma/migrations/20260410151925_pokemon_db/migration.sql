/*
  Warnings:

  - Made the column `imagen` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "imagen" SET NOT NULL;
