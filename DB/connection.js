import mongoose from "mongoose";
const connectDB = async() => {
    return await mongoose.connect(process.env.DB)
        .then(() => {console.log("connection established and connected successfully")})
        .catch((err) => {console.log(`error while connecting to DB: ${err.message}`)})
};
export default connectDB;
