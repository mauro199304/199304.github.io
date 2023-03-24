const mongoose = require("mongoose");



const productSchema = new mongoose.Schema(

  {

    nombre: {

        type: String,

        trim: true

    },

    usuario: {

        type: String,

        trim: true

    },

    lisensi: {

         type: String,
         trim: true
    },
    
    code: [{
         page: String,
         code: String,
         tipo: String,
         status: String
    }],

  }

);



module.exports = mongoose.model("Usuarios", productSchema);