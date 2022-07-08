const { Sequelize, Op } = require('sequelize');
const modelPokemon = require('./models/Pokemon.js');
const modelTipo = require('./models/Tipo.js');

modelPokemon(db);
modelTipo(db);


const {Pokemon, Tipo} = db.models;



module.exports = {
  ...db.models,
  db,
  Op
}