import mongoose from "mongoose";

mongoose.set("sanitizeFilter", true);

const connectDatabase = async (DB_URL, dbName) => {
    try {
        const connection = mongoose.connect(DB_URL, {
            dbName,
        });
        console.log(`${dbName} We are connected too!`);
        return connection;
    } catch (error) {
        console.log('Database connection error:', error);
        throw error;
    }
};

export default connectDatabase;