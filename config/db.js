import mongoose from "mongoose";
import dotenv from 'dotenv'
//configure env
dotenv.config();
const uri = process.env.MONGO_URL


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;
