const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const pokemonsFile = path.join(__dirname, "pokemons.json");
let pokemons = JSON.parse(fs.readFileSync(pokemonsFile, "utf-8"));

// GET /pokemons
app.get("/pokemons", (req, res) => {
  res.json(pokemons);
});

// POST /pokemons
app.post("/pokemons", (req, res) => {
  const { name, imagen, tipo } = req.body;
  if (!name || !tipo) return res.status(400).json({ error: "Faltan campos" });

  // ⚡ Id único
  const id = pokemons.length > 0 ? Math.max(...pokemons.map(p => p.id)) + 1 : 1;
  const newPokemon = { id, name, imagen, tipo };

  pokemons.push(newPokemon);
  fs.writeFileSync(pokemonsFile, JSON.stringify(pokemons, null, 2));

  res.status(201).json(newPokemon);
});

// PUT /pokemons/:id
app.put("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const datos = req.body;

  const index = pokemons.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Pokemon no encontrado" });

  pokemons[index] = { ...pokemons[index], ...datos };
  fs.writeFileSync(pokemonsFile, JSON.stringify(pokemons, null, 2));

  res.json(pokemons[index]); // devolver el Pokémon actualizado
});

//ELIMINAR
app.delete("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = pokemons.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Pokemon no encontrado" });
  }

  pokemons.splice(index, 1);

  // guardar en JSON
  fs.writeFileSync(pokemonsFile, JSON.stringify(pokemons, null, 2));

  res.json({ mensaje: "Eliminado correctamente" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));