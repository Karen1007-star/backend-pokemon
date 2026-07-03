require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// seguridad 
app.use(cors());
app.use(express.json());

/////////////////// PRISMA GET
const prisma = require("./prismaClient");

app.get("/pokemonsCopy", async (req, res) => {
  try {
    const pokemons = await prisma.pokemon.findMany({
      include: {
        maestro: true
      }
    });
    res.json(pokemons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error obteniendo pokemons" });
  }
});
/////////////////////////// LISTA DE MAESTROS:
app.get("/maestros", async (req, res) => {
  try {
    const maestros = await prisma.maestro.findMany({
      include: {
        pokemons: true
      }
    });
    res.json(maestros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error obteniendo maestros" });
  }
});

////////////////////////////////POST PRISMA

app.post("/pokemonsCopy", async (req, res) => {
  const { num, name, imagen, type, maestroId } = req.body;
  
  if (!num || !name || !type) {
    return res.status(400).json({
      error: "Faltan campos"
    });
  }
  if (isNaN(num)) {
  return res.status(400).json({
    error: "num debe ser número"
    });
  }

  if (maestroId) {
  const pokemon = await prisma.pokemon.findUnique({
    where: { num }
  });

    if (pokemon?.maestroId && pokemon.maestroId !== Number(maestroId)) {
      return res.status(400).json({
        error: "Este Pokémon ya pertenece a otro maestro"
        });
      }
    }

  try {
    const nuevo = await prisma.pokemon.create({
      data: {
        num,
        name,
        imagen,
        type,
        maestroId: maestroId ? Number(maestroId) : null
      }
    });

    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creando pokemon" });
  }
});
////////////////////////////////////////////////// MAESTRO:
app.post("/maestros", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Falta nombre" });
  }

  try {
    // verificar si ya existe
    const existente = await prisma.maestro.findFirst({
      where: {
        nombre: nombre.trim()
      }
    });

    if (existente) {
      return res.status(400).json({
        error: "Ese maestro ya existe"
      });
    }

    const maestro = await prisma.maestro.create({
      data: {
        nombre: nombre.trim()
      }
    });

    res.json(maestro);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creando maestro" });
  }
});
///////////////////
app.put("/pokemonsCopy/:num", async (req, res) => {
  const num = parseInt(req.params.num);
  const { name, imagen, type, maestroId } = req.body;

  try {
    // 1. Verificar si existe
    const existe = await prisma.pokemon.findUnique({
      where: { num }
    });

    if (!existe) {
      return res.status(404).json({ error: "No encontrado" });
    }

    // 2. Actualizar
    const actualizado = await prisma.pokemon.update({
      where: { num },
      data: {
        name,
        imagen,
        type,
        maestroId: maestroId ? Number(maestroId) : null
      }
    });

    res.json(actualizado);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error actualizando pokemon" });
  }
});
// delete maestro//
app.delete("/maestros/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.maestro.delete({
      where: { id }
    });

    res.json({ mensaje: "Maestro eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error eliminando maestro" });
  }
});
/// delete pokemon//
app.delete("/pokemonsCopy/:num", async (req, res) => {
  const num = parseInt(req.params.num);

  try {
    const pokemonEliminado = await prisma.pokemon.findUnique({
      where: { num }
    });

    if (!pokemonEliminado) {
      return res.status(404).json({ error: "No encontrado" });
    }

    await prisma.pokemon.delete({
      where: { num }
    });


    res.json({ mensaje: "Eliminado y reordenado" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error eliminando" });
  }
});

//
// SERVER
//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend corriendo en http://localhost:${PORT}`)
);