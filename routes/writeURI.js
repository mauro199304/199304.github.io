const { Router } = require('express');

const router = new Router();

const Product = require("../models/mongo-model");

const Usuarios = require("../models/mongo-usuarios");

const { updateUsuarios, getUsuarios, createUsuarios, deleteUsuarios } = require("../controllers/usuarios-controllers");



const { updateProduct, getProducts, createProduct, deleteProduct } = require("../controllers/mongo-controllers");

const { generate, verifyToken } = require('../Mis-modulos/moduloUno.js');





router.get("/",  async (req, res) => {

    const products = await Product.find();

   // console.log(products[3].url);

        return res.json(products);

  });



router.get("/view/:id",  async (req, res) => {

    const { id } = req.params;

    const products = await Product.findById(id);

    console.log(products);

    console.log(products.urlDashboard);

        return res.json(products);

  }); 



router.post("/add", verifyToken, createUsuarios);



  router.put("/update/:id", verifyToken, updateProduct, (req, res) => {

  

  });



  router.delete("/delete/:id", deleteProduct);

  

  













  module.exports = router;