const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// 🔹 Register / Buat akun baru
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log("DATA MASUK:", req.body); 

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: 'Email sudah terdaftar' });

        const user = new User({ name, email, password, role });
        await user.save();

        console.log("USER BERHASIL DISIMPAN");

        res.status(201).json({ message: 'User berhasil dibuat' });

    } catch (err) {
        console.error("REGISTER ERROR:", err); 
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Login akun
router.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email tidak ditemukan' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Password salah' });

    // 🔹 Generate JWT
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Middleware auth
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Tidak ada token' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};

// 🔹 Hapus akun (harus login)
router.delete('/me', protect, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'Akun berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
