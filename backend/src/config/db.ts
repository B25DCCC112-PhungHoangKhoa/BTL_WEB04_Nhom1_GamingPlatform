import mongoose from "mongoose";


export class Database {
    public static async connect(): Promise<void> {
        try {
            const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/esports_rank_db";
            const conn = await mongoose.connect(mongoURI);
            console.log("Connected to MongoDB", conn.connection.host, conn.connection.port);
        }catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    }
    public static async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}
export default Database;