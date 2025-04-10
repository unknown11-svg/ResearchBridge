import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './Authentication/RouteA.js'; 
import userRoutes from './Api/Routes/UserR.js'; 
import './Authentication/passport.js';
import { authenticateToken} from './tokenmiddleware.js'; 

const app = express();


const mongoURI = 'mongodb://localhost:27017';

mongoose.connect(mongoURI, {

  serverSelectionTimeoutMS: 50000 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


// Passport session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
