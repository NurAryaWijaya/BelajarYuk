require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const materiRoutes = require('./routes/materiRoutes.js');
const authRoutes = require('./routes/authRoutes');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));


app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/materi', materiRoutes);

app.get('/', (req, res) => {
    res.send('Server + MongoDB jalan 🚀');
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected ✅'))
    .catch(err => console.log(err));

app.listen(3000, () => 
    console.log('Server jalan di http://localhost:3000')
);
