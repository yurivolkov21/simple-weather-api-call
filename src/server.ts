// Server: Entry point - Khởi tạo và cấu hình Express server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';

// Load environment variables
dotenv.config();

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());                        // Enable CORS
app.use(express.json());                // Parse JSON body
app.use(express.static('public'));      // Serve static files (HTML/CSS/JS)

// Routes
app.use('/', weatherRoutes);            // Weather API routes

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📍 Weather mode: ${process.env.WEATHER_MODE || 'mock'}`);
    console.log(`📂 Serving static files from 'public' folder`);
});