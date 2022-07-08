const { Router } = require("express");
const { Pokemon, Tipo } = require("../db");
const express = require("express");
const axios = require("axios");
const router = Router();

//! -----------------TERMINADO-----------------------
router.get("/", async (req, res, next) => {
  try {
    const PokemonsDB = await Pokemon.findAll();
    const PokemonsAPI = axios.get("https://pokeapi.co/api/v2/pokemon");
    const [promesaDB, promesaAPI] = await Promise.all([
      PokemonsDB,
      PokemonsAPI,
    ]);

    console.log(promesaAPI.data.results.map(e => await e.axios('')));
    console.log(promesaDB);

    res.send("hola");
  } catch (error) {
    next(error);
  }
});
//! --------------------------------------------------

//! -----------------TERMINADO?-----------------------

router.post("/", async (req, res, next) => {
  try {
    const { name, type, life, attack, defense, speed, height, weight } =
      req.body;
    const newPokemon = await Pokemon.create({
      name,
      type,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    const traerTipos = await Tipo.findAll({
      where: {
        name: type,
      },
    });
    console.log(traerTipos);
    // newPokemon.addTipo(traerTipos);
    res.send("hola");
  } catch (error) {
    next(error);
  }
});
//!ME FALTARIA RELACIONAR CON LOS TIPOS?
//! --------------------------------------------------

//!--------------------TABLA AUXILIAR?----------------

// router.post("/:pokemonId/type/:typeId", async (req, res, next) => {
//   try {
//     const { pokemonId, typeId } = req.params;
//     const pokemon = await Pokemon.findByPk(pokemonId);
//     await pokemon.addTipo(typeId);

//     res.send("hola");
//   } catch (error) {
//     next(error);
//   }
// });
//!ME FALTARIA CREAR UN POST DE TYPES
//! --------------------------------------------------

router.get("/:id", async(req, res, next) => {
try {
  const {id} = req.params;
  const PokemonsDB = await Pokemon.findByPk(id)
  const PokemonsAPI = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const [promesaDB, promesaAPI] = await Promise.all([PokemonsDB, PokemonsAPI])

    // console.log(promesaAPI);
    console.log(promesaDB);

res.send('hola')

} catch (error) {
  next(error)
}
});

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const PokemonsDB = await Pokemon.findAll({
      where: {
        name,
      },
    });
    const PokemonsAPI = axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const [promesaDB, promesaAPI] = await Promise.all([PokemonsDB,PokemonsAPI,]);

    res.send("hola");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
