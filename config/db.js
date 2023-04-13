import mongoose from "mongoose";
import colors from "colors";

const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgBrightRed.white)
    }
}

export default connectDB;