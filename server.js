import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// import routes
import hotelRoutes from './routes/hotelRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import transportRoutes from './routes/transportRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('TravelGenie API is running');
});

// Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/trip-plan', tripRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/weather', weatherRoutes);

// Connect DB and start server
const port = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
