/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Maestro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Maestro_nombre_key" ON "Maestro"("nombre");
