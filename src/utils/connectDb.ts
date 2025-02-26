import mongoose from "mongoose";
import log from "./logger";
import dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => {
  const dbUri = process.env.MONGO_URI  || ''
  log.info("Connection string" + dbUri)


  try {
    log.info("Starting db connection.")
    await mongoose.connect(dbUri);
    log.info("Connected to db.")
    
  } catch (error) {
    log.error(error)
    process.exit(1);
  }
};


export default connectDb