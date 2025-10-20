const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = async () => {
    await mongoose.connect( process.env.mongo_url );
    console.log('Connected to MongoDB Successfully') ;
}

module.exports = mongoConnect ;