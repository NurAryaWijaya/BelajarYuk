const mongoose = require('mongoose');

const materiSchema = new mongoose.Schema({
    kategori: {
        type: String,
        enum: ['Matematika', 'Fisika', 'B. Inggris', 'B. Indonesia'],
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    isi: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Materi', materiSchema);
