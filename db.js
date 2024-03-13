import mongoose from 'mongoose';
    // simpler
// const DBconnection = () => {
//     mongoose.connect(process.env.MONGO_URI).then(() => {
//         console.log("database connected");
//     }).catch((err) => {
//         console.log("database not connected",err);
//     });
// }

    // better to wrap in try catch
const DBconnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        // console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1)
    }
}

// DBconnection();

export default DBconnection