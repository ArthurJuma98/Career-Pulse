const mongoose = require ('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//const dbURI = 'mongodb+srv://arthurjuma:feXt3OOLiWRMuKgq@cluster0.ysltvni.mongodb.net/?retryWrites=true&w=majority';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI='mongodb+srv://arthurjuma:feXt3OOLiWRMuKgq@cluster0.ysltvni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('CONNECTED TO DATABASE...');
    } catch (error) {
        console.error('FAILED TO CONNECT TO DATABASE: ', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;