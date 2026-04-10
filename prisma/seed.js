const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const file = path.join(__dirname, "../pokemonsCopy.json");

const pokemons = JSON.parse(fs.readFileSync(file, "utf-8"));

async function main() {
    await prisma.pokemon.createMany({
    data: pokemons.map(p => ({
        name: p.name,
        type: Array.isArray(p.type)
        ? p.type.join(", ")
        : p.type,
    })),
    });

  console.log("Seed completado 🚀");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });