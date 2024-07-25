const mongoose = require('mongoose');

const connectedDb = async()=>{
    try {
        await mongoose.connect(process.env.Mongodb_URL);
        console.log('MongoDB connected')
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectedDb;