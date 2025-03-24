//OzQyHv1ofs59JzFi
//mongodb+srv://1210anshulagarwal:OzQyHv1ofs59JzFi@cluster0.kirp7.mongodb.net/
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
dotenv.config({});
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:8080",
  credentials:true
}));
const PORT = process.env.PORT || 3000;
app.use("/api/v1/user", userRoute);
app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});
