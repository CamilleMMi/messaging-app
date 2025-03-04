const mongoose = require('mongoose');
const envConfiguration = require('./env.configuration-1.0.0');

const { mongodb_uri } = envConfiguration;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_uri, {});

        console.log('\nConnected to MongoDB');
    } catch (error) {
        console.log(mongodb_uri);
        console.error('\nThe connection to MongoDB failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;