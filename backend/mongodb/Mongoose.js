const mongoose = require('mongoose');
const url=process.env.MONGO_DB || 'mongodb://localhost:27017/sabbir'

const dbconnected = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = dbconnected;
