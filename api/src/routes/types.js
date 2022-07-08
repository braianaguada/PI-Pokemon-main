const { Router } = require("express");
const { Tipo } = require("../db");
const express = require("express");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const typesAPI = await axios.get("https://pokeapi.co/api/v2/type");
    const arrayTypes = typesAPI.data.results.map(e => e.name).map(e => {return {name:e}})
    const typesDB = await Tipo.bulkCreate(arrayTypes)
//!YA TRAIGO LA INFO DESDE LA API ME FALTA GUARDARLA EN LA DB
    console.log(typesDB);

    res.send("hola");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
