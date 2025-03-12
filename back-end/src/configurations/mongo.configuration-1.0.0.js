const mongoose = require('mongoose');
const envConfiguration = require('./env.configuration-1.0.0');

const { mongodb_url } = envConfiguration;

const mongoConfiguration = async () => {
    try {
        await mongoose.connect(mongodb_url, {});

        console.log('\nConnected to MongoDB');
    } catch (error) {
        console.log(mongodb_url);
        console.error('\nThe connection to MongoDB failed', error);
        process.exit(1);
    }
};

module.exports = mongoConfiguration;