import mongoose from 'mongoose';

const DBconnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log("database not connected",err);
    });
}

// DBconnection();

export default DBconnection