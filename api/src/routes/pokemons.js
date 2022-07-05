const { Router } = require("express");
const { Pokemon } = require("../db");
const router = Router();

router.get("/", (req, res, next) => {
  return Pokemon.findAll()
    .then((pokemons) => {
      res.send(pokemons);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newPokemon = await Pokemon.create({
      name,
    });
    res.send(newPokemon);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  res.send("soy get /pokemons/:id");
});

router.get("/:pokemons", (req, res, next) => {
  res.send("soy get /:pokemons");
});

module.exports = router;
