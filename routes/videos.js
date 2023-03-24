const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const { generate, verifyToken } = require('../Mis-modulos/moduloUno.js');


router.get('/', (req, res) => {
 //  res.json(movies);
});


router.post('/', verifyToken, (req, res) => {

       // res.json(movies[0]);
});


  module.exports = router;