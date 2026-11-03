# DOKUMENTASI REST API SISABAIK

## 1. INFORMASI UMUM

Nama proyek: SisaBaik API

Teknologi: Node.js, Express.js, PostgreSQL

Alamat server pengembangan: http://127.0.0.1:3000

API ini digunakan untuk mengelola penawaran makanan, autentikasi pengguna, pengaturan hak akses, dan pembuatan pesanan pada aplikasi SisaBaik.

## 2. PEMERIKSAAN KESEHATAN SERVER

**Metode:** GET

**Endpoint:** `/api/health`

**Fungsi:**

Memeriksa apakah server API berjalan dan koneksi database tersedia.

**Contoh permintaan:**

`GET http://127.0.0.1:3000/api/health`

**Contoh hasil pengujian:**

Status HTTP 200, dengan status aplikasi dan database tersedia.

## 3. PENAWARAN

**Endpoint dasar:** `/api/penawaran`

Operasi yang tersedia:

- GET untuk mengambil data penawaran.
- GET `/:id` untuk mengambil detail penawaran.
- POST untuk membuat penawaran baru.
- PUT `/:id` untuk memperbarui penawaran.
- DELETE `/:id` untuk menghapus penawaran.

Pembuatan dan pengelolaan penawaran memerlukan autentikasi sebagai penyedia. Fitur penyedia juga mensyaratkan akun yang telah diverifikasi.

**Contoh permintaan pembuatan penawaran:**

`POST http://127.0.0.1:3000/api/penawaran`

Header:

- Content-Type: application/json
- Authorization: Bearer `<accessToken>`

Contoh isi JSON:

```json
{
  "penyediaId": "1",
  "nama": "Paket Roti Uji",
  "kategori": "roti",
  "hargaNormal": 10000,
  "hargaPenawaran": 5000,
  "stok": 1,
  "satuan": "paket",
  "status": "aktif",
  "berakhirPada": "2027-01-01T12:00:00.000Z"
}
```

Catatan:

Contoh waktu berakhir di atas hanya ilustrasi. Gunakan waktu yang masih akan datang ketika menguji pembuatan penawaran.

## 4. PESANAN

**Endpoint dasar:** `/api/pesanan`

Metode yang diuji untuk membuat pesanan: POST.

Pembuatan pesanan hanya dapat dilakukan oleh pengguna dengan peran pembeli yang telah login.

**Contoh permintaan:**

`POST http://127.0.0.1:3000/api/pesanan`

Header:

- Content-Type: application/json
- Authorization: Bearer `<accessToken>`

Contoh isi JSON:

```json
{
  "items": [
    {
      "penawaranId": "19",
      "kuantitas": 1
    }
  ]
}
```

Penjelasan:

- `items` berisi daftar penawaran yang dipesan.
- `penawaranId` menunjukkan identitas penawaran.
- `kuantitas` menunjukkan jumlah unit yang dipesan.
- Identitas pembeli diperoleh dari token autentikasi, bukan dari `emailPembeli` pada body permintaan.

Pesanan harus memenuhi aturan bisnis yang diterapkan API, termasuk ketersediaan penawaran dan stok. Pengujian proyek juga memeriksa konflik stok saat dua permintaan berlangsung bersamaan.

Penyedia dapat membaca pesanan miliknya sesuai aturan kepemilikan, tetapi tidak dapat membuat pesanan.

## 5. STATUS HTTP YANG DIUJI

**HTTP 200:**

Permintaan berhasil, misalnya pemeriksaan kesehatan server dan pengambilan data.

**HTTP 201:**

Data berhasil dibuat, misalnya pembuatan penawaran atau pesanan.

**HTTP 204:**

Permintaan berhasil tanpa mengembalikan isi respons, misalnya penghapusan data.

**HTTP 400:**

Permintaan tidak memenuhi validasi data.

**HTTP 401:**

Autentikasi tidak valid, token kedaluwarsa, atau sesi telah dicabut.

**HTTP 403:**

Pengguna tidak memiliki hak akses atau akun penyedia belum diverifikasi.

**HTTP 409:**

Konflik permintaan, misalnya ketika stok tidak lagi mencukupi.

## 6. HASIL UJI KONKURENSI

**Skenario:**

Sebuah penawaran dibuat dengan stok awal satu unit. Dua permintaan pembuatan pesanan untuk penawaran yang sama dikirim secara bersamaan.

**Hasil aktual:**

- Status dua permintaan: 201 dan 409.
- Stok akhir: 0.
- Hasil skrip: PASS.

**Kesimpulan:**

Dalam skenario pengujian ini, hanya satu pesanan berhasil menggunakan stok terakhir. Permintaan lainnya menerima status konflik HTTP 409.

## 7. CATATAN

Dokumentasi ini merupakan ringkasan endpoint dan skenario yang telah diuji. Implementasi aktual dapat dilihat pada folder `src/routes`, `src/controllers`, `src/services`, dan `src/repositories`.

## 8. FILTER DAN PAGINATION PENAWARAN

**Endpoint:**

`GET /api/penawaran`

Parameter query yang didukung:

- `q`: pencarian teks, maksimal 100 karakter.
- `kategori`: filter kategori, maksimal 40 karakter.
- `status`: filter status. Nilai yang diperbolehkan adalah draft, aktif, habis, dan kedaluwarsa.
- `tersedia`: menerima nilai true atau false. Default false.
- `page`: nomor halaman positif. Default 1.
- `limit`: jumlah data per halaman. Default 10 dan maksimum 50.

**Contoh permintaan:**

`GET http://127.0.0.1:3000/api/penawaran?q=roti&status=aktif&page=1&limit=10`

Contoh tersebut menggabungkan pencarian teks, filter status, dan pagination.

## 9. VALIDASI DATA PENAWARAN

Data penawaran harus berupa objek JSON dan hanya boleh berisi kolom yang didukung API.

Ketentuan validasi yang diterapkan:

- `penyediaId` harus berupa ID positif yang valid.
- `nama` harus terdiri dari 3 sampai 120 karakter.
- `kategori` harus terdiri dari 1 sampai 40 karakter.
- `hargaNormal` harus berupa integer positif.
- `hargaPenawaran` tidak boleh melebihi `hargaNormal`.
- `stok` harus berupa integer nol atau lebih.
- `satuan` harus terdiri dari 1 sampai 20 karakter.
- `status` harus berupa draft, aktif, habis, atau kedaluwarsa.
- `berakhirPada` harus menggunakan format tanggal ISO 8601 dengan zona waktu dan harus berada di masa depan.

Selain validasi data, pembuatan dan pengelolaan penawaran menerapkan pemeriksaan autentikasi, peran penyedia, verifikasi penyedia, dan kepemilikan data.

## 10. VALIDASI DATA PESANAN

Data pesanan harus memuat `items`.

Ketentuan validasi yang diterapkan:

- `items` harus berupa array berisi 1 sampai 10 item.
- Setiap item memuat `penawaranId` dan `kuantitas`.
- `penawaranId` harus berupa ID positif yang valid.
- `kuantitas` harus berupa integer antara 1 sampai 1000.
- ID penawaran tidak boleh berulang dalam satu pesanan.
- Kolom tambahan yang tidak didukung akan ditolak.
- Identitas pembeli ditentukan berdasarkan token autentikasi.

## 11. FORMAT RESPONS API

Respons daftar penawaran menggunakan objek yang memuat `success` serta `data` hasil daftar dan informasi pagination yang dikembalikan repository.

Respons detail penawaran menggunakan format:

```json
{
  "success": true,
  "data": {}
}
```

Respons pembuatan penawaran menggunakan HTTP 201 dan menyertakan header Location menuju detail penawaran yang dibuat.

Respons pembaruan penawaran menggunakan HTTP 200.

Respons penghapusan penawaran menggunakan HTTP 204 tanpa isi respons.

## 12. CATATAN VALIDASI

Kesalahan validasi menghasilkan HTTP 400 dengan kode `VALIDATION_ERROR`.

Format lengkap respons kesalahan mengikuti middleware penanganan kesalahan aplikasi.

## 13. AUTENTIKASI PENGGUNA

API menyediakan autentikasi menggunakan email, kata sandi, dan JSON Web Token (JWT).

**13.1 Registrasi**

Metode: POST

Endpoint: `/api/auth/register`

Contoh permintaan:

```json
{
  "nama": "Pembeli Baru",
  "email": "pembeli@example.test",
  "kataSandi": "contohKataSandi123",
  "peran": "pembeli"
}
```

Endpoint ini digunakan untuk mendaftarkan akun pengguna baru.

**13.2 Login**

Metode: POST

Endpoint: `/api/auth/login`

Contoh permintaan:

```json
{
  "email": "pembeli@example.test",
  "kataSandi": "contohKataSandi123"
}
```

Login yang berhasil menghasilkan access token JWT untuk digunakan pada endpoint yang memerlukan autentikasi.

**13.3 Informasi pengguna yang sedang login**

Metode: GET

Endpoint: `/api/auth/saya`

Header:

`Authorization: Bearer <accessToken>`

Endpoint ini digunakan untuk mengambil informasi akun berdasarkan token yang dikirimkan.

**13.4 Logout**

Metode: POST

Endpoint: `/api/auth/logout`

Header:

`Authorization: Bearer <accessToken>`

Logout mencabut sesi token yang sedang digunakan sehingga token tersebut tidak dapat digunakan kembali.

**Masa berlaku token:**

Access token memiliki masa berlaku 15 menit.

## 14. HAK AKSES BERDASARKAN PERAN (RBAC)

API menerapkan Role-Based Access Control (RBAC) untuk membatasi akses berdasarkan peran pengguna.

**Pembeli:**

- Dapat membuat pesanan.
- Dapat membaca pesanan miliknya sendiri.
- Tidak dapat mengelola penawaran sebagai penyedia.

**Penyedia:**

- Dapat mengelola penawaran miliknya sendiri.
- Dapat membaca pesanan yang berkaitan dengan penyediaannya sesuai aturan kepemilikan.
- Tidak dapat membuat pesanan sebagai pembeli.
- Harus memiliki akun yang telah diverifikasi untuk menggunakan fitur penyedia.

## 15. KEPEMILIKAN DATA

API menerapkan pemeriksaan kepemilikan untuk melindungi data pengguna.

- Pembeli hanya dapat mengakses pesanan miliknya sendiri.
- Penyedia hanya dapat mengelola penawaran miliknya sendiri.
- Penyedia hanya dapat membaca pesanan yang berkaitan dengan penyediaannya.
- Identitas pengguna diperoleh dari token autentikasi yang telah diverifikasi, bukan dari identitas yang dikirim bebas melalui body permintaan.

Pemeriksaan kepemilikan dilakukan pada endpoint yang memerlukan pembatasan akses data.

## 16. KODE KESALAHAN AUTENTIKASI DAN OTORISASI

Berikut kode kesalahan yang digunakan pada proses autentikasi dan pemeriksaan hak akses:

**1. HTTP 401 - AUTH_REQUIRED**

Token autentikasi tidak tersedia pada permintaan yang membutuhkan login.

**2. HTTP 401 - TOKEN_EXPIRED**

Token autentikasi telah melewati masa berlaku.

**3. HTTP 401 - SESSION_REVOKED**

Sesi token telah dicabut melalui proses logout sehingga token tidak dapat digunakan kembali.

**4. HTTP 401 - LOGIN_FAILED**

Email atau kata sandi tidak valid, atau akun pengguna tidak aktif.

**5. HTTP 403 - ROLE_FORBIDDEN**

Peran pengguna tidak memiliki hak akses untuk menjalankan operasi yang diminta.

**6. HTTP 403 - PROVIDER_NOT_VERIFIED**

Akun penyedia belum diverifikasi sehingga belum dapat menggunakan fitur yang memerlukan verifikasi penyedia.

**Akhir Dokumentasi REST API SisaBaik**