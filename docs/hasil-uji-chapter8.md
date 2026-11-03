# LAPORAN HASIL PENGUJIAN CHAPTER 8

## SISABAIK API

### 1. Informasi Pengujian

- Nama proyek: SisaBaik API
- Tanggal pengujian: 3 November 2026
- Lingkungan: Lokal
- Alamat server: `http://127.0.0.1:3000`
- Database: `sisabaik_dev`
- Script pengujian: `scripts/uji-auth.js`

### 2. Pemeriksaan Koneksi Database

Perintah:

```bash
npm run db:check
```

Hasil:
- Koneksi PostgreSQL berhasil.
- Database yang digunakan adalah `sisabaik_dev`.
- Data penawaran berhasil dibaca.

Status: **LULUS**

### 3. Pengujian Authentication dan Authorization

Perintah:

```bash
npm run auth:test
```

Hasil aktual:

```text
PASS: 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot.
Bukti: penawaran 22, pesanan 13; fixture dipertahankan.
```

Status: **LULUS**

Pengujian mencakup:
- Registrasi akun pembeli dan penyedia.
- Login menggunakan email dan kata sandi.
- Validasi token akses.
- Penolakan akses tanpa autentikasi.
- Pembatasan akses berdasarkan peran pengguna.
- Verifikasi status penyedia.
- Pemeriksaan kepemilikan penawaran.
- Pemeriksaan kepemilikan pesanan.
- Validasi transaksi pesanan dan snapshot harga.
- Logout dan pencabutan sesi.

### 4. Hasil Pengujian Hak Akses

Berdasarkan skenario pada script pengujian:

- Pengguna tanpa token ditolak dengan HTTP 401.
- Pembeli yang mencoba membuat penawaran ditolak dengan HTTP 403.
- Penyedia yang belum terverifikasi tidak dapat mengakses fitur penawarannya.
- Penyedia tidak dapat mengubah atau menghapus penawaran milik penyedia lain.
- Pembeli tidak dapat melihat pesanan milik pembeli lain.
- Pengguna yang logout tidak dapat menggunakan kembali sesi yang dicabut.

Status: **LULUS untuk skenario yang tercakup dalam pengujian otomatis.**

### 5. Pengujian Kepemilikan dan Transaksi

Hasil pengujian menunjukkan:

- Penawaran dibuat menggunakan identitas penyedia yang sedang login.
- Pesanan dibuat menggunakan identitas pembeli yang sedang login.
- Data pesanan hanya dapat diakses oleh pihak yang memiliki hak.
- Snapshot harga pesanan tetap menggunakan harga saat transaksi dibuat.
- Penawaran yang sudah digunakan dalam pesanan tidak dapat dihapus sembarangan.

Status: **LULUS**

### 6. Catatan Pengujian Tambahan

Skenario token kedaluwarsa, akun nonaktif, dan pengujian manual melalui browser belum diverifikasi secara terpisah dalam pelaksanaan pengujian yang dicatat pada laporan ini.

Skenario tersebut tidak dinyatakan lulus sampai pengujian aktual dilakukan.

### 7. Kesimpulan

Berdasarkan pengujian otomatis `npm run auth:test`, sebanyak 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot berhasil dijalankan.

Hasil ini menunjukkan bahwa mekanisme autentikasi, pembatasan hak akses, kepemilikan data, dan pengelolaan transaksi berjalan sesuai dengan skenario yang diuji.

### 8. Informasi Tambahan

- Branch pengujian: `integration/backend-postgresql-auth`
- Commit integrasi Authentication: `0b4f27f`
- Database: `sisabaik_dev`
- Kata sandi dan JWT secret tidak dicantumkan dalam laporan.

