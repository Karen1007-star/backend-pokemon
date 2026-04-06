const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 DEFINIR BIEN EL ARCHIVO
const pokemonsFile = path.join(__dirname, "pokemonsCopy.json");

// 🔥 FUNCIONES
const leerPokemons = () => {
  return JSON.parse(fs.readFileSync(pokemonsFile, "utf-8"));
};

const guardarPokemons = (data) => {
  fs.writeFileSync(pokemonsFile, JSON.stringify(data, null, 2));
};

//
// GET
//
app.get("/pokemonsCopy", (req, res) => {
  const pokemons = leerPokemons();
  res.json(pokemons);
});

//
// POST
//
app.post("/pokemonsCopy", (req, res) => {
  const pokemons = leerPokemons(); // 🔥 IMPORTANTE

  const { name, imagen, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const num = pokemons.length > 0
    ? Math.max(...pokemons.map(p => p.num)) + 1
    : 1;

  const newPokemon = { num, name, imagen, type };

  pokemons.push(newPokemon);
  guardarPokemons(pokemons);

  res.status(201).json(newPokemon);
});

//
// PUT (por num)
//
app.put("/pokemonsCopy/:num", (req, res) => {
  const pokemons = leerPokemons(); // 🔥

  const num = parseInt(req.params.num);
  const index = pokemons.findIndex(p => p.num === num);

  if (index === -1) {
    return res.status(404).json({ error: "Pokemon no encontrado" });
  }

  pokemons[index] = { ...pokemons[index], ...req.body };

  guardarPokemons(pokemons);

  res.json(pokemons[index]);
});

//
// DELETE (por posición)
//
app.delete("/pokemonsCopy/:index", (req, res) => {
  const pokemons = leerPokemons(); // 🔥

  const index = parseInt(req.params.index);

  if (index < 0 || index >= pokemons.length) {
    return res.status(404).json({ error: "Posición inválida" });
  }

  pokemons.splice(index, 1);

  const nuevos = pokemons.map((p, i) => ({
    ...p,
    num: i + 1
  }));

  guardarPokemons(nuevos);

  res.json({ mensaje: "Eliminado correctamente" });
});

//
// SERVER
//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend corriendo en http://localhost:${PORT}`)
);