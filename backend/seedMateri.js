require('dotenv').config();
const mongoose = require('mongoose');
const Materi = require('./models/Materi');

const mongoURI = process.env.MONGO_URI;

// 🔹 Connect MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected ✅'))
    .catch(err => console.log(err));

// 🔹 Data Materi (24 materi: 4 kategori x 6 materi)
const materiData = [
    // --- MATEMATIKA ---
    {
        kategori: 'Matematika',
        judul: 'Limit dan Turunan Fungsi',
        isi: 'Materi ini membahas konsep limit fungsi di titik tertentu, limit tak hingga, dan perhitungan turunan fungsi aljabar serta trigonometri. Pemahaman limit sangat penting untuk menentukan kontinuitas fungsi. Contohnya, limit dari f(x) ketika x mendekati a, ditulis lim(x→a) f(x), dapat digunakan untuk menentukan turunan f\'(x). Turunan digunakan untuk menemukan gradien garis singgung pada kurva, menganalisis titik maksimum dan minimum fungsi, serta menyelesaikan masalah gerak dan perubahan cepat dalam fisika dan ekonomi. Turunan fungsi dasar seperti x^n, sin(x), cos(x) dan aturan rantai, produk, serta pembagian menjadi fondasi penting. Siswa SMA 3 biasanya mengerjakan soal limit tak tentu, limit satu sisi, dan turunan aljabar kompleks, serta aplikasinya dalam problem nyata seperti optimasi dan perubahan laju.'
    },
    {
        kategori: 'Matematika',
        judul: 'Integral Tentu dan Tak Tentu',
        isi: 'Materi ini membahas konsep integral tak tentu dan integral tentu, termasuk aturan dasar integral, substitusi, dan integrasi parsial. Integral tak tentu digunakan untuk menemukan fungsi asli dari turunan yang diketahui, sedangkan integral tentu dipakai untuk menghitung luas di bawah kurva. Aplikasi nyata integral antara lain menentukan jarak dari fungsi kecepatan, menghitung luas daerah bidang, volume benda putar, dan akumulasi jumlah. Contoh integral sederhana: ∫ x^n dx = x^(n+1)/(n+1) + C. Integral tentu memiliki batas atas dan bawah: ∫_a^b f(x) dx = F(b) - F(a). Siswa SMA 3 sering menghadapi soal integral trigonometri, eksponensial, dan kombinasi fungsi aljabar dalam soal ujian nasional.'
    },
    {
        kategori: 'Matematika',
        judul: 'Barisan dan Deret',
        isi: 'Materi barisan dan deret mencakup pengertian barisan aritmatika dan geometri, rumus suku ke-n, jumlah n suku pertama, dan sifat deret tak hingga. Barisan aritmatika memiliki beda tetap, sedangkan barisan geometri memiliki rasio tetap. Penerapan materi ini meliputi masalah pertumbuhan populasi, bunga majemuk, dan prediksi pola angka. Siswa perlu memahami rumus: Un = a + (n-1)b untuk aritmatika, Un = a * r^(n-1) untuk geometri, dan Sn = n/2 * (a + Un) untuk jumlah aritmatika. Untuk deret geometri tak hingga dengan |r|<1: S = a / (1-r). Materi ini penting untuk persiapan soal ujian terkait pola dan analisis deret.'
    },
    {
        kategori: 'Matematika',
        judul: 'Matriks dan Determinan',
        isi: 'Materi ini mencakup pengertian matriks, operasi matriks (penjumlahan, pengurangan, perkalian), invers matriks, dan determinan. Determinan digunakan untuk memecahkan sistem persamaan linear, serta menentukan sifat matriks seperti singular atau tidak. Siswa SMA 3 biasanya mempelajari metode eliminasi Gauss, Cramer’s Rule, dan aplikasi matriks dalam transformasi geometri. Contoh determinan 2x2: |A| = ad - bc. Determinan 3x3 menggunakan metode Sarrus atau kofaktor. Penerapan nyata: menyelesaikan soal sistem persamaan linear dan analisis transformasi.'
    },
    {
        kategori: 'Matematika',
        judul: 'Fungsi Komposisi & Invers',
        isi: 'Materi ini membahas fungsi komposisi f∘g(x) = f(g(x)) dan fungsi invers f^(-1)(x). Fungsi komposisi digunakan untuk menggabungkan dua fungsi dan menganalisis perubahan input ke output secara berurutan. Fungsi invers digunakan untuk membalik proses fungsi sehingga f(f^(-1)(x)) = x. Siswa perlu memahami cara menentukan fungsi invers aljabar dan trigonometri, memverifikasi invers, dan memecahkan masalah aplikasi. Contoh: jika f(x) = 2x + 3, maka f^(-1)(x) = (x-3)/2. Materi ini sering muncul di soal optimasi dan persamaan fungsi.'
    },
    {
        kategori: 'Matematika',
        judul: 'Statistika & Peluang',
        isi: 'Materi statistika dan peluang mencakup rata-rata, median, modus, simpangan baku, varians, peluang kejadian, peluang gabungan, peluang bersyarat, dan diagram peluang. Aplikasi nyata meliputi analisis data eksperimen, prediksi hasil, dan pengambilan keputusan. Contoh: peluang muncul angka genap pada dadu = 3/6 = 0.5. Siswa SMA 3 menghadapi soal kombinasi statistika dengan peluang, menghitung peluang gabungan A ∩ B, A ∪ B, dan peluang bersyarat P(A|B). Materi ini sangat penting untuk persiapan ujian nasional dan SBMPTN.'
    },

    // --- FISIKA ---
    {
        kategori: 'Fisika',
        judul: 'Gaya dan Hukum Newton',
        isi: 'Materi ini membahas tiga hukum Newton: Hukum Inersia, Hukum Percepatan, dan Hukum Aksi–Reaksi. Hukum Newton digunakan untuk menganalisis gerak benda, termasuk benda jatuh bebas, gerak pada bidang miring, dan sistem gaya. Contoh soal: jika massa m = 5 kg, gaya F = 20 N, maka percepatan a = F/m = 4 m/s^2. Materi juga menjelaskan gaya gesek, tegangan tali, dan gaya normal. Siswa SMA 3 perlu memahami diagram gaya dan penerapan hukum Newton pada masalah nyata, termasuk prediksi gerak benda dalam kehidupan sehari-hari dan eksperimen laboratorium.'
    },
    {
        kategori: 'Fisika',
        judul: 'Usaha dan Energi',
        isi: 'Materi usaha dan energi mencakup konsep usaha, energi kinetik, energi potensial, dan hukum kekekalan energi. Usaha didefinisikan W = F · s · cosθ. Energi kinetik: Ek = 1/2 mv^2. Energi potensial: Ep = mgh. Hukum kekekalan energi menyatakan energi total tetap. Siswa belajar menghitung energi saat benda bergerak di bidang miring, pegas, atau sistem mekanik. Aplikasi nyata: menghitung kerja mesin, energi gerak kendaraan, dan eksperimen fisika. Persiapan ujian menuntut siswa mampu menghubungkan usaha dan perubahan energi secara analitik.'
    },
    {
        kategori: 'Fisika',
        judul: 'Momentum & Tumbukan',
        isi: 'Materi ini membahas momentum linear p = m·v, hukum kekekalan momentum, dan tumbukan elastis maupun tidak elastis. Siswa belajar menghitung kecepatan benda sebelum dan sesudah tumbukan, serta analisis energi kinetik. Contoh soal: dua benda bertumbukan dengan massa berbeda, hitung kecepatan akhir masing-masing. Materi ini penting untuk memahami interaksi benda dalam sistem, termasuk penerapan pada kendaraan dan eksperimen laboratorium.'
    },
    {
        kategori: 'Fisika',
        judul: 'Medan Listrik & Gauss',
        isi: 'Materi ini membahas konsep medan listrik, gaya Coulomb, dan hukum Gauss. Medan listrik E = F/q digunakan untuk menganalisis interaksi muatan. Hukum Gauss mempermudah perhitungan medan pada distribusi muatan simetris. Siswa SMA 3 biasanya belajar soal medan listrik garis lurus, cincin, dan bola. Contoh: menghitung medan listrik di titik tertentu akibat beberapa muatan. Materi ini relevan untuk ujian dan praktikum fisika.'
    },
    {
        kategori: 'Fisika',
        judul: 'Induksi Elektromagnetik',
        isi: 'Materi ini mencakup hukum Faraday, Lenz, dan aplikasi induksi elektromagnetik. Siswa belajar menghitung gaya gerak listrik (ggl) induksi, arus induksi, dan arah arus. Aplikasi nyata: generator, transformator, dan sistem listrik rumah tangga. Soal ujian biasanya meminta menghitung ggl induksi atau menganalisis arah arus akibat perubahan fluks magnetik.'
    },
    {
        kategori: 'Fisika',
        judul: 'Gelombang Bunyi & Optik',
        isi: 'Materi ini membahas gelombang bunyi (frekuensi, amplitudo, kecepatan) dan fenomena optik (pembiasan, pemantulan, lensa). Siswa belajar menghitung panjang gelombang, intensitas bunyi, dan pembiasan cahaya melalui lensa tipis. Aplikasi nyata: alat musik, instrumen optik, teleskop, dan eksperimen fisika laboratorium. Soal ujian menuntut kemampuan analisis fenomena gelombang dan penerapan hukum Snell.'
    },

    // --- B. Inggris ---
    {
        kategori: 'B. Inggris',
        judul: 'Reading Comprehension – Narrative',
        isi: 'Materi ini mengajarkan siswa membaca teks naratif dan memahami informasi utama, ide pokok, karakter, dan alur cerita. Siswa harus mampu menjawab pertanyaan soal ujian berdasarkan teks, termasuk inferensi, kosakata, dan konteks. Teknik membaca cepat, pemahaman kata kunci, serta strategi scanning dan skimming digunakan. Contoh: membaca cerita fiksi, menjawab pertanyaan “what is the main idea?” atau “why did the character do this?”. Materi ini membantu siswa menghadapi ujian nasional dan persiapan TOEFL/IELTS.'
    },
    {
        kategori: 'B. Inggris',
        judul: 'Grammar – Tenses',
        isi: 'Materi ini membahas penggunaan tenses lengkap: present, past, future, continuous, perfect, dan perfect continuous. Siswa belajar membuat kalimat benar, mengidentifikasi kesalahan, dan menerapkan tenses pada konteks soal ujian. Contoh: Simple Past untuk menceritakan kejadian di masa lalu; Present Perfect untuk pengalaman hidup; Future Continuous untuk rencana yang akan sedang berlangsung. Soal ujian biasanya meminta siswa mengubah kalimat atau melengkapi teks dengan tenses tepat.'
    },
    {
        kategori: 'B. Inggris',
        judul: 'Vocabulary – Academic Words',
        isi: 'Materi ini meliputi kosakata akademik dan formal yang sering muncul dalam teks bacaan, esai, dan soal ujian. Siswa mempelajari sinonim, antonim, kolokasi, dan penggunaan kata dalam konteks. Contoh kata: “analyze”, “significant”, “interpret”, “evaluate”. Materi ini membantu siswa memahami teks panjang dan menjawab soal reading comprehension serta menulis esai dengan bahasa formal.'
    },
    {
        kategori: 'B. Inggris',
        judul: 'Writing – Essay Structure',
        isi: 'Materi ini mengajarkan cara menulis esai dengan struktur jelas: introduction, body, dan conclusion. Siswa belajar menyusun argumen logis, mendukung dengan bukti, dan menggunakan bahasa akademik. Contoh: menulis esai tentang lingkungan, pendidikan, atau teknologi. Teknik revisi dan proofreading juga diajarkan. Materi ini penting untuk ujian bahasa Inggris dan persiapan SBMPTN/TOEFL.'
    },
    {
        kategori: 'B. Inggris',
        judul: 'Dialogue – Functional Expression',
        isi: 'Materi ini membahas percakapan fungsional: menyapa, meminta informasi, meminta bantuan, menawarkan bantuan, dan menanggapi situasi sehari-hari. Siswa belajar menulis dan berbicara dengan ekspresi yang tepat sesuai konteks. Contoh soal: melengkapi percakapan dengan ungkapan yang benar, menulis dialog tentang perjalanan atau kegiatan sekolah. Materi ini membantu persiapan ujian lisan dan tertulis.'
    },
    {
        kategori: 'B. Inggris',
        judul: 'Listening – Main Idea',
        isi: 'Materi ini mengajarkan strategi mendengarkan informasi utama dalam teks audio, seperti cerita pendek, pengumuman, dan dialog. Siswa belajar menentukan ide pokok, detail penting, dan inferensi dari audio. Teknik ini sangat berguna untuk ujian listening, TOEFL, dan persiapan ujian nasional. Contoh: mendengarkan percakapan dan menjawab pertanyaan “what is the main idea?”'
    },

    // --- B. Indonesia ---
    {
        kategori: 'B. Indonesia',
        judul: 'Teks Eksposisi',
        isi: 'Materi ini membahas cara membuat teks eksposisi, yang bertujuan menjelaskan atau menguraikan suatu topik. Siswa belajar menyusun tesis, argumen pendukung, dan penutup. Contoh: menulis teks tentang dampak perubahan iklim. Materi ini penting untuk soal ujian membaca, menulis, dan analisis teks.'
    },
    {
        kategori: 'B. Indonesia',
        judul: 'Teks Diskusi',
        isi: 'Materi ini mengajarkan siswa membuat teks diskusi, yang menyajikan berbagai pendapat pro dan kontra. Struktur teks meliputi pernyataan masalah, argumen pro, argumen kontra, dan kesimpulan. Siswa diajarkan menganalisis masalah sosial atau ilmiah dan menulis argumen logis. Contoh soal: membuat teks diskusi tentang penggunaan gadget di kalangan remaja.'
    },
    {
        kategori: 'B. Indonesia',
        judul: 'Teks Deskripsi',
        isi: 'Materi ini membahas cara menulis teks deskripsi yang menggambarkan objek, tempat, atau peristiwa dengan jelas. Siswa belajar menggunakan kata sifat, keterangan, dan urutan logis. Contoh: mendeskripsikan sekolah, taman, atau hewan peliharaan. Materi ini penting untuk ujian menulis dan membaca.'
    },
    {
        kategori: 'B. Indonesia',
        judul: 'Karya Ilmiah',
        isi: 'Materi ini mengajarkan siswa menulis karya ilmiah dengan struktur: pendahuluan, metode, hasil, dan kesimpulan. Siswa belajar mengumpulkan data, analisis, dan menyusun laporan. Contoh: eksperimen sains sederhana dan laporan hasilnya. Materi ini penting untuk persiapan ujian dan tugas akademik.'
    },
    {
        kategori: 'B. Indonesia',
        judul: 'Analisis Novel',
        isi: 'Materi ini membahas teknik analisis novel: tema, karakter, alur, latar, dan amanat. Siswa belajar membaca kritis dan membuat ringkasan atau resensi. Contoh: menganalisis novel klasik atau modern untuk soal ujian sastra.'
    },
    {
        kategori: 'B. Indonesia',
        judul: 'Citraan dalam Puisi',
        isi: 'Materi ini mengajarkan siswa mengenali citraan visual, auditori, dan kinestetik dalam puisi. Siswa belajar menafsirkan makna puisi dan menulis analisis. Contoh: menganalisis puisi dari sastrawan Indonesia untuk ujian bahasa Indonesia.'
    }
];

// 🔹 Seed function
async function seedMateri() {
    try {
        await Materi.deleteMany({}); // optional: hapus data lama
        await Materi.insertMany(materiData);
        console.log('Semua materi berhasil dimasukkan ✅');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
}

seedMateri();
