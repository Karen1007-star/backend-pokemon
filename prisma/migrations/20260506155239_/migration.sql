-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "maestroId" INTEGER;

-- CreateTable
CREATE TABLE "Maestro" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Maestro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_maestroId_fkey" FOREIGN KEY ("maestroId") REFERENCES "Maestro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
