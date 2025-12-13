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
import authRoutes from './routes/auth/authRoutes.js';
import uploadRoutes from './routes/upload.routes.js';
import heroRoutes from './routes/hero.routes.js';
import destinationRoutes from './routes/destinationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Default route
app.get('/', (req, res) => {
    res.send('TravelGenie API is running');
});

// Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/destinations', destinationRoutes);

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
