const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
// seguridad 
app.use(cors());
app.use(express.json());

//  DEFINIR BIEN EL ARCHIVO - path(ruta), se crea una ruta hacia el archivo
// __dirname= la carpeta donde esta el archivo json - path.join(une rutas)
//__dirname= punto de partida
const pokemonsFile = path.join(__dirname, "pokemonsCopy.json");

//  FUNCIONES
const leerPokemons = () => {
                    //lee el archivo Y ESPERA, sino seria readFIle, de esta ruta y devuelvo como texto
                    // fs = el modulo para trabajar con archvios
  return JSON.parse(fs.readFileSync(pokemonsFile, "utf-8"));
        //convierte un strign en un objeto o array
};

const guardarPokemons = (data) => {
   //Escriebe el texto geenrado a partir de la data
   //                            // convierto el objeto a texto JSON 
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
  const pokemons = leerPokemons(); //  IMPORTANTE
  // saca esa variables del req.body(contiene los datos que vienen del frontend) y conviertalas a variables 
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
app.put("/pokemonsCopy/:index", (req, res) => {
  const pokemons = leerPokemons();

  const index = parseInt(req.params.index);
                        // porque el indice empieza en cero
  if (index < 0 || index >= pokemons.length) {
    return res.status(404).json({ error: "Índice inválido" });
  }
                                        //Los datos que enviaron desde front al back, se extiende y se reemplaza
  pokemons[index] = { ...pokemons[index], ...req.body };
  // guarda TODOS los pokemons 
  guardarPokemons(pokemons);
  // Lo convierte y ENVIA el texto JSON internamente - del Bk al FE
  res.json(pokemons[index]);
});

//
// DELETE (por posición)
//
app.delete("/pokemonsCopy/:index", (req, res) => {
  const pokemons = leerPokemons(); // 

  const index = parseInt(req.params.index);

  if (index < 0 || index >= pokemons.length) {
    return res.status(404).json({ error: "Posición inválida" });
  }
  // elimina el indice, solo 1 posicion
  pokemons.splice(index, 1);
                                        // sobre escribe el num, i vale de manera automatica 0 porque es un atributo de map
  const nuevos = pokemons.map((p, i) => ({...p,num: i + 1}));

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