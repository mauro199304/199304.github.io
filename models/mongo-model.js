const mongoose = require("mongoose");



const productSchema = new mongoose.Schema(

  {

    urlHome: {

      type: String,

      trim: true

    },

    urlDashboard: {

      type: String,

      trim: true

    },

    nombre: {

        type: String,

        trim: true

    },

    usuario: {

        type: String,

        trim: true

    },

    estado: {

        type: String,

        trim: true

      },

      url: {

        type: String,

        trim: true

      },

      hora: {

        type: String,

        trim: true

      }

  }

);



module.exports = mongoose.model("Product", productSchema);