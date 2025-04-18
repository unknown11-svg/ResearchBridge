import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './Authentication/RouteA.js';
import userRoutes from './Api/Routes/UserR.js';
import './Authentication/passport.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
app.use(cors({
  origin:  'http://localhost:3000',
  credentials: true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection "3ev5Likg9xKEey0Q"
const mongoURI = 'mongodb+srv://phuthigab:3ev5Likg9xKEey0Q@rcluster.fgc7eum.mongodb.net/?retryWrites=true&w=majority&appName=RCluster'; 
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 50000 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
