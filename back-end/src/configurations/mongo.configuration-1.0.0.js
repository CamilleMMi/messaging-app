const mongoose = require('mongoose');
const configuration = require('./env.configuration-1.0.0');

const { mongodb_uri } = configuration;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_uri, {});

        console.log('\nConnected to MongoDB');
    } catch (error) {
        console.error('\nThe connection to MongoDB failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;