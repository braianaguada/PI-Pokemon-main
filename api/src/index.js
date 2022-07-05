const { Sequelize, Op } = require('sequelize');
const modelPokemon = require('./models/Pokemon.js');
const modelTipo = require('./models/Tipo.js');

modelPokemon(db);
modelTipo(db);


const {Pokemon, Tipo} = db.models;

Pokemon.belongsToMany(Tipo, {through: 'Pokemon_Tipo'});
Tipo.belongsToMany(Pokemon, {through: 'Pokemon_Tipo'});

module.exports = {
  ...db.models,
  db,
  Op
}