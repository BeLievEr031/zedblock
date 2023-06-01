import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log("connected to the db");

    } catch (error) {
        return console.log(error);
    }
}

export default dbConnect;