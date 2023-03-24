const { Router } = require('express');
const router = new Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { generate, verifyToken } = require('../Mis-modulos/moduloUno.js');
const Usuarios = require("../models/mongo-usuarios");
const { buscarUsuarioYLicencia, updateUsuarios, getUsuarios, createUsuarios, deleteUsuarios } = require("../controllers/usuarios-controllers");

const mySecretKey = process.env['SECRET_KEY'];
const user = process.env['SECRET_USERS'];
const passw = process.env['SECRET_PASSWORD'];
const Product = require("../models/mongo-model");

const request = require('request');



router.get('/', async (req, res) => {
  const usuarios = await Usuarios.find();
  res.json(usuarios);
});

router.post("/premium", buscarUsuarioYLicencia,(req, res) => {
  
});
// Now, create a new token for the current user, with a renewed expiration time

router.post("/add", verifyToken, createUsuarios,(req, res) => {
           
           });

 router.put("/update/:id", verifyToken, updateUsuarios, (req, res) => {
  
  });


router.delete("/delete/:id", verifyToken, deleteUsuarios);


module.exports = router;