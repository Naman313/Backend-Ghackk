
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

// CORS middleware - allow requests from the frontend application
const allowedOrigins = ['http://localhost:3000', 'https://frontend-ghackk.vercel.app/'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman) or check if origin is allowed
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Include this if you are sending cookies or authorization headers
}));

// Allow preflight requests for all routes
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
