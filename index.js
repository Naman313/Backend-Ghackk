
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import connectToDB from "./db/connectToDb.js";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
    origin: 'https://frontend-ghackk.vercel.app',  // Your frontend domain
    credentials: true,  // Allow credentials such as cookies
    optionsSuccessStatus: 200  // For legacy browser support
};

app.use(cors(corsOptions)); 


app.use(express.json()); 

// Middleware for cookie parsing
app.use(cookieParser());

// Auth routes middleware
app.use("/api/auth", authroutes);
app.use("/fav", favoritesRoutes);

// Connect to the database and start the server
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`);
});
