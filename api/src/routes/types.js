const { Router } = require('express');
const { Op, Pokemon, Tipo } = require('../db');
const router = Router();

router.get("/", (req, res) => {
    res.send('soy get /types')
})

module.exports = router;
