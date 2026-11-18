import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Database } from "./config/db.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Kết nối csdl
Database.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK",
    timestamp: new Date().toISOString()});
});
// Routes
app.use("/api/auth", authRoutes);


// Error handling middleware 404 and Global error Handling
app.use(ErrorMiddleware.notFoundHandler);
app.use(ErrorMiddleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
