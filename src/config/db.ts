import mongoose from "mongoose"


const connectDB = async () => {
  const dburi = process.env.Mongo_URI || "";

  try {

    const conn = await mongoose.connect(dburi)
    console.log(`DB Conected: ${conn.connection.host}`);
  } catch (error) {
    console.log("DB Not Connected Error", error)
    process.exit(1)
  }
}

export default connectDB
