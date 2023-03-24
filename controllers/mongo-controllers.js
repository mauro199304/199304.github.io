const Product = require("../models/mongo-model");

const fs = require('fs-extra');







const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    return res.json(products);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};









const createProduct = async (req, res) => {

  console.log(req.body.urlHome);

  //  const { urlDashboard, urlHome } = req.body;

  //const { nombre,usuario,estado } = req.body

  const { url, hora } = req.body

  // if (!urlDashboard) return res.status(404).json({message: 'urlDashboard is required'})

  //if (!urlHome) return res.status(404).json({message: 'urlHome is required'})



  try {

      

    const newProduct = new Product({

      url,

      hora

      });

    if (req.files?.image) {

      const result = await uploadImage(req.files.image.tempFilePath)

      newProduct.image = {

        public_id: result.public_id,

        secure_url: result.secure_url

      }

      await fs.unlink(req.files.image.tempFilePath)

    }



    const savedProduct = await newProduct.save();

    return res.json(savedProduct);

  } catch (error) {

    if (req.files?.image) {

      await fs.unlink(req.files.image.tempFilePath)

    }

    return res.status(500).json({ message: error.message });

  }

};





const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);



    if (!deletedProduct) return res.status(404).json({ message: 'Product does not exists' })



    await deleteImage(deletedProduct.image.public_id)



    return res.json(deletedProduct);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};





const updateProduct = async (req, res) => {

  const { id } = req.params;

  try {

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {

      new: true,

    });

    if (!updatedProduct)

      return res.status(404).json({ message: "Product Not Found" });

    return res.json(updatedProduct);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};





module.exports = { updateProduct, getProducts, createProduct, deleteProduct };