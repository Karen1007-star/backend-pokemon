require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
// const { PrismaClient } = require("../generated/prisma");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

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

// app.get("/pokemonsCopy", (req, res) => {
//   const pokemons = leerPokemons();
//   res.json(pokemons);
// });
/////////////////// PRISMA GET
      const prisma = require("./prismaClient");

      app.get("/pokemonsCopy", async (req, res) => {
        try {
          const pokemons = await prisma.pokemon.findMany();
          res.json(pokemons);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error obteniendo pokemons" });
        }
      });

//
// POST
//
            // app.post("/pokemonsCopy", (req, res) => {
            //   const pokemons = leerPokemons(); //  IMPORTANTE
            //   // saca esa variables del req.body(contiene los datos que vienen del frontend) y conviertalas a variables 
            //   const { name, imagen, type } = req.body;
            //   if (!name || !type) {
            //     return res.status(400).json({ error: "Faltan campos" });
            //   }

            //   const num = pokemons.length > 0
            //     ? Math.max(...pokemons.map(p => p.num)) + 1
            //     : 1;

            //   const newPokemon = { num, name, imagen, type };

            //   pokemons.push(newPokemon);
            //   guardarPokemons(pokemons);

            //   res.status(201).json(newPokemon);
            // });

////////////////////////////////POST PRISMA

        app.post("/pokemonsCopy", async (req, res) => {
          const { name, imagen, type } = req.body;

          try {
            // 1. Buscar el último num
            const ultimo = await prisma.pokemon.findFirst({
              orderBy: { num: "desc" }
            });

            // 2. Generar el correlativo
            const nuevoNum = ultimo ? ultimo.num + 1 : 1;

            // 3. Crear el pokemon
            const nuevo = await prisma.pokemon.create({
              data: {
                num: nuevoNum,
                name,
                imagen,
                type
              }
            });

            res.json(nuevo);
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error creando pokemon" });
          }
        });
//
// PUT (por num)
//
// app.put("/pokemonsCopy/:index", (req, res) => {
//   const pokemons = leerPokemons();

//   const index = parseInt(req.params.index);
//                         // porque el indice empieza en cero
//   if (index < 0 || index >= pokemons.length) {
//     return res.status(404).json({ error: "Índice inválido" });
//   }
//                                         //Los datos que enviaron desde front al back, se extiende y se reemplaza
//   pokemons[index] = { ...pokemons[index], ...req.body };
//   // guarda TODOS los pokemons 
//   guardarPokemons(pokemons);
//   // Lo convierte y ENVIA el texto JSON internamente - del Bk al FE
//   res.json(pokemons[index]);
// });

app.put("/pokemonsCopy/:num", async (req, res) => {
  const num = parseInt(req.params.num);
  const { name, imagen, type } = req.body;

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
        type
      }
    });

    res.json(actualizado);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error actualizando pokemon" });
  }
});


//
// DELETE (por posición)
//
// app.delete("/pokemonsCopy/:num", (req, res) => {
//   const pokemons = leerPokemons(); // 

//   const index = parseInt(req.params.num);

//   if (index < 0 || index >= pokemons.length) {
//     return res.status(404).json({ error: "Posición inválida" });
//   }
//   // elimina el indice, solo 1 posicion
//   pokemons.splice(index, 1);
//                                         // sobre escribe el num, i vale de manera automatica 0 porque es un atributo de map
//   const nuevos = pokemons.map((p, i) => ({...p,num: i + 1}));

//   guardarPokemons(nuevos);

//   res.json({ mensaje: "Eliminado correctamente" });
// });

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

    await prisma.pokemon.updateMany({
      where: {
        num: {
          gt: pokemonEliminado.num
        }
      },
      data: {
        num: {
          decrement: 1
        }
      }
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