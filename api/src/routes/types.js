const { Router } = require("express");
const { Tipo } = require("../db");
const express = require("express");
const axios = require("axios");
const router = Router();

//! -----------------NO TERMINADO GET /types-----------------------

router.get("/", async (req, res) => {
  try {
    const typesAPI = await axios.get("https://pokeapi.co/api/v2/type");
    const contador = await Tipo.count();

    if(contador === 0) {
      const arrayTypes = typesAPI.data.results.map(e => e.name).map(e => {return {name:e}})
      await Tipo.bulkCreate(arrayTypes)
    }
    
    const traerTipos = await Tipo.findAll()
    res.send(traerTipos);
  } catch (error) {
    next(error);
  }
});
//! FALTA LIMITAR BULKCREATE
//! --------------------------------------------------

module.exports = router;
