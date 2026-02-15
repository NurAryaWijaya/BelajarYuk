const express = require('express');
const router = express.Router();
const Materi = require('../models/Materi');

// 🔹 GET semua materi
router.get('/', async (req, res) => {
    try {
        const semuaMateri = await Materi.find();
        res.json(semuaMateri);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 GET materi by ID
router.get('/:id', async (req, res) => {
    try {
        const materi = await Materi.findById(req.params.id);
        if (!materi) return res.status(404).json({ error: 'Materi tidak ditemukan' });
        res.json(materi);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 GET materi berdasarkan kategori
router.get('/kategori/:kategori', async (req, res) => {
    try {
        // decode URL agar spasi (%20) atau karakter lain kembali normal
        const kategori = decodeURIComponent(req.params.kategori);

        const materi = await Materi.find({ kategori });
        res.json(materi);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 POST tambah materi baru
router.post('/', async (req, res) => {
    try {
        const { kategori, judul, isi } = req.body;
        const materiBaru = new Materi({ kategori, judul, isi });
        await materiBaru.save();
        res.status(201).json(materiBaru);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔹 PUT update materi
router.put('/:id', async (req, res) => {
    try {
        const { kategori, judul, isi } = req.body;
        const materiUpdate = await Materi.findByIdAndUpdate(
        req.params.id,
        { kategori, judul, isi },
        { new: true, runValidators: true }
        );
        if (!materiUpdate) return res.status(404).json({ error: 'Materi tidak ditemukan' });
        res.json(materiUpdate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔹 DELETE materi
router.delete('/:id', async (req, res) => {
    try {
        const materiHapus = await Materi.findByIdAndDelete(req.params.id);
        if (!materiHapus) return res.status(404).json({ error: 'Materi tidak ditemukan' });
        res.json({ message: 'Materi berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
