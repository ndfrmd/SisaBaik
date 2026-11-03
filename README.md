## SISABAIK API

REST API untuk aplikasi SisaBaik yang mengelola penawaran makanan dan pembuatan pesanan menggunakan Express.js dan PostgreSQL. API dilengkapi autentikasi JWT, otorisasi berbasis peran, serta pemeriksaan kepemilikan data.

## 1. Teknologi

- Node.js versi 22 atau lebih baru
- Express.js 5
- PostgreSQL
- `pg` untuk koneksi database
- `bcryptjs` untuk hashing kata sandi
- `jsonwebtoken` untuk autentikasi JWT
- `express-rate-limit` untuk pembatasan permintaan
- Helmet untuk keamanan HTTP headers

## 2. Persyaratan

Sebelum menjalankan aplikasi, pastikan perangkat telah memiliki:

- Node.js dan npm
- PostgreSQL
- Database pengembangan yang sudah disiapkan sesuai skema proyek

## 3. Instalasi

1. Buka terminal pada folder proyek `sisabaik-api`.
2. Pasang dependensi:

   ```bash
   npm install
   ```

3. Siapkan file `.env` berdasarkan `.env.example`.
4. Sesuaikan konfigurasi koneksi database pada `.env`.
5. Isi `JWT_SECRET` dengan nilai rahasia yang kuat.
6. Pastikan PostgreSQL aktif dan database dapat diakses.

**Catatan keamanan:** Jangan membagikan kata sandi database, JWT secret, token, atau informasi rahasia lainnya. File `.env` tidak boleh dimasukkan ke repositori Git.

## 4. Menjalankan Aplikasi

Mode pengembangan:

```bash
npm run dev
```

Mode produksi:

```bash
npm start
```

Server menggunakan port yang dikonfigurasi melalui `.env`.

## 5. Pemeriksaan Database

Untuk memeriksa koneksi database:

```bash
npm run db:check
```

## 6. Pengujian API

Pengujian API Chapter 7:

```bash
npm run api:test:chapter7
```

Pengujian autentikasi dan otorisasi Chapter 8:

```bash
npm run auth:test
```

Verifikasi akun penyedia:

```bash
npm run penyedia:verifikasi -- email@contoh.test
```

Pastikan server dan database pengembangan tersedia sesuai kebutuhan masing-masing skrip pengujian.

## 7. Autentikasi dan Otorisasi

API menggunakan JSON Web Token (JWT) untuk autentikasi pengguna.

Fitur autentikasi meliputi:

- Pendaftaran akun pembeli dan penyedia.
- Login menggunakan email dan kata sandi.
- Hashing kata sandi menggunakan bcrypt.
- Pemeriksaan token melalui middleware autentikasi.
- Logout dengan pencabutan sesi melalui versi token.
- Masa berlaku token selama 15 menit.
- Pembatasan permintaan login dan pendaftaran.

Otorisasi menggunakan pembagian peran:

- **Pembeli:** dapat melihat penawaran dan membuat pesanan.
- **Penyedia:** dapat mengelola penawaran dan melihat pesanan miliknya.
- **Penyedia terverifikasi:** diperlukan untuk akses tertentu sebagai penyedia.

Sistem juga menerapkan pemeriksaan kepemilikan agar pengguna tidak dapat mengakses data milik pengguna lain.

Halaman autentikasi tersedia melalui:

```text
/auth.html
```

## 8. Hasil Pengujian

Pengujian otomatis Chapter 8 menghasilkan:

- 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot berhasil.
- Pengujian logout menghasilkan penolakan sesi yang sudah dicabut.
- Pengujian token kedaluwarsa menghasilkan `401 TOKEN_EXPIRED`.
- Pengujian hak akses menghasilkan `403 ROLE_FORBIDDEN`.
- Pengujian akun nonaktif menghasilkan `401 LOGIN_FAILED`.
- Pengujian pesanan memastikan stok berkurang sesuai jumlah pesanan.

Hasil pengujian manual dan detail skenario dicatat pada `docs/hasil-uji-chapter8.md`.

## 9. Dokumentasi API

Dokumentasi endpoint API tersedia di:

```text
docs/API.md
```

Hasil pengujian Chapter 7 dan Chapter 8 tersedia di:

```text
docs/hasil-uji-chapter7.md
docs/hasil-uji-chapter8.md
```

## 10. Catatan Pengembangan

- Express.js digunakan untuk menangani permintaan HTTP.
- PostgreSQL digunakan untuk menyimpan data.
- Konfigurasi database dan autentikasi disimpan melalui environment variables.
- `.env.example` merupakan contoh konfigurasi tanpa informasi rahasia.
- Skrip pengujian dapat membuat data baru di database pengembangan.
- Jangan menjalankan ulang skrip migrasi atau seed yang menghapus data tanpa memastikan dampaknya terlebih dahulu.