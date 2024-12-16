const mongoose = require('mongoose');

// Connect to MongoDB
function connectToDB() {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('MONGO_URI is not defined in .env file');
        return;
    }

    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
}

module.exports = connectToDB;