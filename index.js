
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

// Allow both localhost (development) and Vercel (production)
const allowedOrigins = ['http://localhost:3000', 'https://frontend-ghackk.vercel.app'];

app.use(cors((req, callback) => {
    const origin = req.header('Origin');
    
    if (allowedOrigins.includes(origin)) {
        // Allow the origin
        callback(null, { origin: true });
    } else {
        // Block the origin (it will not include CORS headers)
        callback(null, { origin: false });
    }
}));

// Handle preflight requests
app.options('*', cors());




// Middleware to parse JSON request bodies
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
