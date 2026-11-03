# SisaBaik

*Developed by Annida Firmadhani (23367006)*

SisaBaik adalah aplikasi yang membantu penyedia mengelola stok makanan berlebih melalui penjualan dengan harga khusus atau penyaluran. Aplikasi ini juga membantu masyarakat memperoleh makanan yang lebih terjangkau sekaligus mengurangi limbah pangan.

## Teknologi

- Node.js 22 atau lebih baru
- Express.js 5
- PostgreSQL
- `pg` untuk koneksi database
- HTML, CSS, dan JavaScript

## Struktur dan Halaman Proyek

### Frontend awal
- `index.html`: halaman informasi SisaBaik.
- `daftar-penyedia.html`: formulir pendaftaran penyedia.
- `tawarkan-makanan.html`: formulir penawaran makanan.
- `styles.css`: sistem visual dan layout responsif.
- `data/penawaran.json`: data penawaran prototipe.

### Frontend aplikasi
- `public/index.html`: halaman utama aplikasi.
- `public/auth.html`: halaman autentikasi.
- `public/app.js`: interaksi halaman utama.
- `public/auth.js`: logika autentikasi.
- `public/auth.css`: gaya halaman autentikasi.

### Backend
- `server.js`: titik masuk server.
- `src/app.js`: konfigurasi aplikasi Express.
- `src/routes/`: definisi endpoint API.
- `src/controllers/`: pengendali permintaan.
- `src/services/`: logika bisnis.
- `src/repositories/`: akses data.
- `src/middleware/`: middleware autentikasi dan penanganan permintaan.
- `src/db/`: koneksi dan transaksi database.

### Database dan pengujian
- `database/`: skema, seed, query, CRUD, transaksi, dan pengujian integritas.
- `scripts/`: pemeriksaan database dan pengujian API.

## Persyaratan

Sebelum menjalankan aplikasi, pastikan sudah tersedia:

- Node.js dan npm.
- PostgreSQL.
- Database pengembangan yang disiapkan sesuai skema proyek.

## Instalasi

1. Buka terminal pada folder proyek.
2. Pasang dependensi:

   ```bash
   npm install
   ```

3. Salin `.env.example` menjadi `.env`.
4. Sesuaikan konfigurasi koneksi database pada `.env`.
5. Pastikan PostgreSQL aktif dan database dapat diakses.

**Catatan keamanan:** Jangan membagikan kata sandi database atau informasi rahasia lainnya. File `.env` tidak boleh dimasukkan ke repositori Git.

## Menjalankan Aplikasi

Mode pengembangan:

```bash
npm run dev
```

Mode normal:

```bash
npm start
```

Server menggunakan alamat lokal dan port yang dikonfigurasi pada proyek.

## Pemeriksaan Database

Untuk memeriksa koneksi database:

```bash
npm run db:check
```

## Pengujian API

Untuk menjalankan pengujian API:

```bash
npm run api:test
```

Untuk pengujian konkurensi:

```bash
node scripts/uji-konkurensi.js
```

Pastikan server API dan database sudah berjalan sebelum melakukan pengujian.

## Hasil Pengujian Konkurensi

Pengujian dilakukan dengan membuat penawaran yang memiliki stok awal satu unit, kemudian mengirimkan dua permintaan pembuatan pesanan secara bersamaan.

Hasil pengujian:

- Permintaan pertama berhasil dengan HTTP 201.
- Permintaan kedua ditolak dengan HTTP 409.
- Stok akhir menjadi 0.
- Pengujian menampilkan status PASS.

Hasil tersebut menunjukkan bahwa pada skenario pengujian, hanya satu pesanan yang berhasil menggunakan stok terakhir.

## Dokumentasi API

Dokumentasi endpoint, autentikasi, format permintaan, respons, dan kode kesalahan tersedia pada:

- `docs/API.md`

## Integritas Akademik

Proyek dikembangkan secara bertahap mengikuti capaian pembelajaran mata kuliah Pengembangan Web. Setiap bagian kode dan implementasi perlu dipahami serta dapat dijelaskan oleh mahasiswa.