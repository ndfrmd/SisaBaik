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

### 6. Hasil Pengujian Manual Tambahan

Pengujian manual dilakukan untuk memastikan mekanisme autentikasi dan keamanan akses pengguna SisaBaik berjalan sesuai kebutuhan Chapter 8.

Hasil pengujian yang telah dikonfirmasi:

Registrasi pengguna: Registrasi akun pembeli dan penyedia berhasil dilakukan melalui browser.

Login penyedia: Akun penyedia terverifikasi berhasil melakukan login.

Penggunaan JWT: Pemeriksaan pengiriman token autentikasi telah dilakukan.

Token kedaluwarsa: Server mengembalikan HTTP 401 dengan kode TOKEN_EXPIRED.

Akun nonaktif: Percobaan login ditolak dengan HTTP 401 dan kode LOGIN_FAILED.

RBAC dan kepemilikan data: Pengujian otomatis berhasil memvalidasi pembatasan akses berdasarkan peran dan kepemilikan sumber daya.

Kesimpulan: Seluruh skenario di atas telah diuji dan dinyatakan berhasil berdasarkan hasil pengujian otomatis serta konfirmasi pengujian manual.

Pengujian otomatis menggunakan npm run auth:test juga berhasil menyelesaikan 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot.

### 7. Kesimpulan

Berdasarkan pengujian otomatis `npm run auth:test`, sebanyak 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot berhasil dijalankan.

Hasil ini menunjukkan bahwa mekanisme autentikasi, pembatasan hak akses, kepemilikan data, dan pengelolaan transaksi berjalan sesuai dengan skenario yang diuji.

### 8. Informasi Tambahan

- Branch pengujian: `integration/backend-postgresql-auth`
- Commit integrasi Authentication: `0b4f27f`
- Database: `sisabaik_dev`
- Kata sandi dan JWT secret tidak dicantumkan dalam laporan.


### 9. Pengujian Transfer Individu — Filter Kepemilikan Penawaran

Tujuan: Memastikan meta.jumlah pada endpoint GET /api/penawaran/milik-saya?q=... hanya menghitung penawaran milik penyedia yang sedang login dan sesuai filter pencarian.

Lingkungan pengujian:

Database: sisabaik_dev

Filter: q=Roti Uji Kepemilikan

Data lama tetap dipertahankan.

Data dan hasil pengujian:

1. Penyedia Rina Baru

Nama usaha: Zpretanda

ID penyedia: 3

ID penawaran: 25

Nama penawaran: Roti Uji Kepemilikan

Filter pencarian: q=Roti Uji Kepemilikan

Hasil meta.jumlah: 1

Status: LULUS

2. Penyedia Budi Baru

Nama usaha: Budi makanan

ID penyedia: 8

ID penawaran: 24

Nama penawaran: Roti Uji Kepemilikan

Filter pencarian: q=Roti Uji Kepemilikan

Hasil meta.jumlah: 1

Status: LULUS

Ketika Rina Baru login, API hanya mengembalikan penawaran ID 25. Ketika Budi Baru login, API hanya mengembalikan penawaran ID 24. Kedua respons memiliki meta.jumlah = 1 dengan filter pencarian yang sama.

Penjelasan: Pemeriksaan peran penyedia saja belum cukup karena kedua akun memiliki peran yang sama. Server juga harus membatasi data berdasarkan identitas penyedia yang diperoleh dari sesi autentikasi. Dengan demikian, penawaran milik penyedia lain tidak ikut ditampilkan atau dihitung.

Perubahan sementara untuk pengujian: Pada public/auth.js, permintaan tombol Lihat penawaran sendiri sempat ditambahkan parameter q=Roti%20Uji%20Kepemilikan untuk menguji filter kepemilikan. Setelah hasil pengujian Rina dan Budi dicatat, perubahan tersebut dikembalikan agar tombol kembali menampilkan seluruh penawaran milik penyedia.

Perubahan kode yang dipertahankan: Pada src/repositories/penawaran.js, ditambahkan komentar yang menjelaskan bahwa parameter filter dan ID pemilik yang sama digunakan untuk menghitung total dan mengambil daftar penawaran. Perubahan ini hanya berupa dokumentasi dalam kode dan tidak mengubah perilaku aplikasi.

Pengujian otomatis tambahan:

Pengujian filter kepemilikan ditambahkan ke scripts/uji-auth.js. Skrip membuat penawaran dengan nama yang sama untuk dua akun penyedia berbeda, kemudian memanggil endpoint GET /api/penawaran/milik-saya menggunakan filter q dan token masing-masing penyedia.

Assertion memastikan bahwa meta.jumlah bernilai 1 untuk masing-masing penyedia dan daftar hasil hanya memuat ID penawaran milik akun yang sedang login.

Hasil eksekusi npm run auth:test: PASS — 47 pemeriksaan HTTP dan assertion kepemilikan/snapshot.

Bukti terminal: penawaran ID 26, pesanan ID 14, dan fixture dipertahankan.

Perubahan kode fungsional yang dipertahankan untuk latihan ini berada di scripts/uji-auth.js, yaitu penambahan pengujian otomatis filter kepemilikan dan meta.jumlah.

### 10. Penjelasan Alur POST Pesanan

Endpoint: POST /api/pesanan

Verifikasi token: Middleware wajibLogin membaca header Authorization, memeriksa format Bearer, lalu memverifikasi JWT melalui verifikasiToken().

Baca akun: Server menggunakan cariId(p.sub) untuk mengambil akun dari database. Akun harus aktif dan versi token harus sesuai. Identitas hasil pemeriksaan disimpan dalam req.pengguna.

Pemeriksaan peran: Route menjalankan wajibPeran("pembeli"), sehingga hanya akun pembeli yang boleh membuat pesanan.

Validasi items: Controller memanggil pesananSesiValid(req.body, req.pengguna). Body hanya boleh berisi items. Identitas pembeli diambil dari req.pengguna.id, bukan dari input pengguna.

Transaksi stok: Service buatPesanan() memeriksa pembeli aktif, ketersediaan penawaran, verifikasi penyedia, masa berlaku, kecukupan stok, dan kesamaan penyedia. Proses penyimpanan pesanan, detail pesanan, serta pengurangan stok dijalankan dalam satu transaksi database.

Response: Jika berhasil, controller mengembalikan HTTP 201 Created, header Location, dan data pesanan.

Sumber identitas tepercaya: Identitas pengguna berasal dari JWT yang telah diverifikasi dan akun yang dibaca dari database. Server menggunakan req.pengguna sebagai dasar otorisasi dan penentuan pembeliId. Field identitas yang dikirim melalui request body tidak dipercaya.

Kesimpulan: Alur pembuatan pesanan menerapkan autentikasi, pemeriksaan peran, pembatasan identitas pembeli, validasi data, dan transaksi stok pada sisi server.