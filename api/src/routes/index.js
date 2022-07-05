const { Router } = require('express');
const pokemonRoute = require('./pokemons')
const typesRoute = require('./types')

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
router.use('/pokemons', pokemonRoute)
router.use('/types', typesRoute)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
