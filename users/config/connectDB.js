import mongoose from "mongoose";
const connectDB = async (DB_URL) => {
    
    try {
        const options = {
            dbName:'hrmsDB'
        }
        await mongoose.connect(DB_URL,options);
        console.log(`${options.dbName} 'Database Connected Successfully'`);
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;