const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://maurito:Maurito.123@cluster0.zhc4ksv.mongodb.net/?retryWrites=true&w=majority"



const connectToDB = async () => {

  try {

    await mongoose.connect(MONGODB_URI);

    console.log("Mongodb connected");

  } catch (error) {

    console.error(error);

  }

};



module.exports = connectToDB();