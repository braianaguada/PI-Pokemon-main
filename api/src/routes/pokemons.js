const { Router } = require("express");
const router = Router();
const { Pokemon, Tipo } = require("../db");
const axios = require("axios");

//! -----------------TERMINADO GET /pokemons Y GET /pokemons?name="..."-----------------------

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  if (name) {
    try {
      const PokemonsAPI = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      const PokemonsAdentro = PokemonsAPI.data.results.filter(
        (e) => e.name === name
      );

      if (PokemonsAdentro.length) {
        const IngresoURLPokemon = await axios.get(PokemonsAdentro[0].url);
        const objAPI = {
          id: IngresoURLPokemon.data.id,
          name: IngresoURLPokemon.data.name.toLowerCase(),
          image:
            IngresoURLPokemon.data.sprites.other["official-artwork"]
              .front_default,
          life: IngresoURLPokemon.data.stats[0].base_stat,
          attack: IngresoURLPokemon.data.stats[1].base_stat,
          defense: IngresoURLPokemon.data.stats[2].base_stat,
          speed: IngresoURLPokemon.data.stats[5].base_stat,
          height: IngresoURLPokemon.data.height,
          weight: IngresoURLPokemon.data.weight,
          types: IngresoURLPokemon.data.types.map((e) => e.type.name),
        };
        const PokemonsDB = await Pokemon.findAll({
          include: Tipo,
          where: {
            name,
          },
        });

        const objDB = PokemonsDB.map((e) => {
          return {
            id: e.id,
            name: e.name,
            image: e.image,
            life: e.life,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            types: e.tipos.map((type) => type.name),
          };
        });
        const respuesta = [...objDB, objAPI];

        res.send(respuesta);
      } else {
        const PokemonsDB = await Pokemon.findAll({
          include: Tipo, //! JOIN
          where: {
            name,
          },
        });
        const PokemonsAdentro = PokemonsDB.filter(
          (e) => e.name.toLowerCase() === name.toLowerCase()
        );
        if (PokemonsAdentro.length) {
          const objDB = PokemonsDB.map((e) => {
            return {
              id: e.id,
              name: e.name,
              image: e.image,
              life: e.life,
              attack: e.attack,
              defense: e.defense,
              speed: e.speed,
              height: e.height,
              weight: e.weight,
              types: e.tipos.map((type) => type.name),
            };
          });

          const respuesta = [...objDB];
          res.send(respuesta);
        } else {
          res.status(404).send("Insert correct Pokemon name ");
        }
      }
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const PokemonsDB = await Pokemon.findAll({
        include: Tipo, //! JOIN
      });

      const objDB = PokemonsDB.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.image,
          attack: e.attack,
          types: e.tipos.map((type) => type.name),
        };
      });
      const PokemonsAPI = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      const PokemonsAdentro = PokemonsAPI.data.results.map((e) =>
        axios.get(e.url)
      );
      const PokemonsAdentro2 = await Promise.all(PokemonsAdentro);
      const PokemonsAdentro3 = PokemonsAdentro2.map((e) => e.data);
      const objApi = PokemonsAdentro3.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.sprites.other["official-artwork"].front_default,
          attack: e.stats[1].base_stat,
          types: e.types.map((type) => type.type.name),
        };
      });

      const resultadoFinal = [...objDB, ...objApi];
      // const resultadoFinal= await Promise.all(...objDB, objApi)

      res.send(resultadoFinal);
    } catch (error) {
      next(error);
    }
  }
});
//! --------------------------------------------------

//! -----------------TERMINADO POST /pokemons-----------------------

router.post("/", async (req, res, next) => {
  try {
    const { name, image, type, life, attack, defense, speed, height, weight } =
      req.body;

    const nombre = name.toLowerCase();

    const newPokemon = await Pokemon.create({
      name: nombre,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    const consultaTipos = await Tipo.findAll({
      where: {
        name: type,
      },
    });

    const tipeId = consultaTipos?.map((e) => e.dataValues.id);
    await newPokemon.addTipo(tipeId);

    res.send(newPokemon);
  } catch (error) {
    next(error);
  }
});

//! --------------------------------------------------

//! -----------------TERMINADO GET /pokemons/{idPokemon}-----------------------

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.toString().length > 5) {
      const PokemonsDB = await Pokemon.findByPk(id, {
        include: Tipo, //! JOIN
      });
      const objDB = {
        id: PokemonsDB.id,
        name: PokemonsDB.name.toLowerCase(),
        image: PokemonsDB.image,
        life: PokemonsDB.life,
        attack: PokemonsDB.attack,
        defense: PokemonsDB.defense,
        speed: PokemonsDB.speed,
        height: PokemonsDB.height,
        weight: PokemonsDB.weight,
        types: PokemonsDB.tipos.map((type) => type.name),
      };
      res.send(objDB);
    } else if (id <= 40) {
      const PokemonsAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const objApi = {
        id: PokemonsAPI.data.id,
        name: PokemonsAPI.data.name.toLowerCase(),
        image: PokemonsAPI.data.sprites.other["official-artwork"].front_default,
        life: PokemonsAPI.data.stats[0].base_stat,
        attack: PokemonsAPI.data.stats[1].base_stat,
        defense: PokemonsAPI.data.stats[2].base_stat,
        speed: PokemonsAPI.data.stats[5].base_stat,
        height: PokemonsAPI.data.height,
        weight: PokemonsAPI.data.weight,
        types: PokemonsAPI.data.types.map((type) => type.type.name),
      };
      res.send(objApi);
    }
  } catch (error) {
    next(error);
  }
});

//! --------------------------------------------------

module.exports = router;

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const PokemonsDB = await Pokemon.destroy({ where: { id } });

    res.send("Pokemon eliminado con exito");
  } catch (error) {
    next(error);
  }
});
