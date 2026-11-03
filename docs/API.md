# DOKUMENTASI REST API SISABAIK

1\.	INFORMASI UMUM

Nama proyek: SisaBaik API

Teknologi: Node.js, Express.js, PostgreSQL

Alamat server pengembangan: http://127.0.0.1:3000

API ini digunakan untuk mengelola penawaran makanan dan pembuatan pesanan pada aplikasi SisaBaik.



2\. PEMERIKSAAN KESEHATAN SERVER

Metode: GET

Endpoint: /api/health

Fungsi:

Memeriksa apakah server API berjalan dan koneksi database tersedia.

Contoh permintaan:

GET http://127.0.0.1:3000/api/health

Contoh hasil pengujian:

Status HTTP 200, dengan status aplikasi dan database tersedia.



3\. PENAWARAN

Endpoint dasar: /api/penawaran

Operasi yang tersedia dan perlu disesuaikan dengan implementasi aktual:

•	GET untuk mengambil data penawaran.

•	GET / untuk mengambil detail penawaran.

•	POST untuk membuat penawaran baru.

•	PUT / untuk memperbarui penawaran.

•	DELETE / untuk menghapus penawaran.

Pembuatan penawaran menggunakan metode POST. Data yang diuji dalam proyek meliputi identitas penyedia, nama penawaran, kategori, harga normal, harga penawaran, stok, satuan, status, dan waktu berakhir.

Contoh permintaan pembuatan penawaran:

POST http://127.0.0.1:3000/api/penawaran

Header:

Content-Type: application/json

Contoh isi JSON:

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

Catatan:

Contoh waktu berakhir di atas hanya ilustrasi. Gunakan waktu yang masih akan datang ketika menguji pembuatan penawaran.



4\. PESANAN

Endpoint dasar: /api/pesanan

Metode yang diuji untuk membuat pesanan: POST.

Contoh permintaan:

POST http://127.0.0.1:3000/api/pesanan

Header:

Content-Type: application/json

Contoh isi JSON:

{

"emailPembeli": "siti.pembeli@example.test",

"items": \[

{

"penawaranId": "1",

"kuantitas": 1

}

]

}

Penjelasan:

•	emailPembeli adalah alamat email pembeli yang terdaftar.

•	items berisi daftar penawaran yang dipesan.

•	penawaranId menunjukkan identitas penawaran.

•	kuantitas menunjukkan jumlah unit yang dipesan.

Pesanan harus memenuhi aturan bisnis yang diterapkan API, termasuk ketersediaan penawaran dan stok. Pengujian proyek juga memeriksa konflik stok saat dua permintaan berlangsung bersamaan.



5\. STATUS HTTP YANG DIUJI

HTTP 200:

Permintaan berhasil, misalnya pemeriksaan kesehatan server dan pengambilan data.

HTTP 201:

Data berhasil dibuat, misalnya pembuatan penawaran atau pesanan.

HTTP 409:

Konflik permintaan, misalnya ketika stok tidak lagi mencukupi.

Status lain yang mungkin digunakan oleh API bergantung pada validasi, autentikasi, dan penanganan kesalahan yang diterapkan pada setiap endpoint.



6\. HASIL UJI KONKURENSI

Skenario:

Sebuah penawaran dibuat dengan stok awal satu unit. Dua permintaan pembuatan pesanan untuk penawaran yang sama dikirim secara bersamaan.

Hasil aktual:

•	Status dua permintaan: 201 dan 409.

•	Stok akhir: 0.

•	Hasil skrip: PASS.

Kesimpulan:

Dalam skenario pengujian ini, hanya satu pesanan berhasil menggunakan stok terakhir. Permintaan lainnya menerima status konflik HTTP 409.



7\. CATATAN

Dokumentasi ini merupakan ringkasan endpoint dan skenario yang telah diuji. Sebelum diserahkan, cocokkan metode HTTP, parameter, format respons, filter pencarian, dan format kesalahan dengan kode aktual pada folder src/routes, src/controllers, dan src/services.



8\. FILTER DAN PAGINATION PENAWARAN



Endpoint:

GET /api/penawaran



Parameter query yang didukung:



\- q: pencarian teks, maksimal 100 karakter.

\- kategori: filter kategori, maksimal 40 karakter.

\- status: filter status. Nilai yang diperbolehkan adalah draft, aktif, habis, dan kedaluwarsa.

\- tersedia: menerima nilai true atau false. Default false.

\- page: nomor halaman positif. Default 1.

\- limit: jumlah data per halaman. Default 10 dan maksimum 50.



Contoh permintaan:



GET http://127.0.0.1:3000/api/penawaran?q=roti\&status=aktif\&page=1\&limit=10



Contoh tersebut menggabungkan pencarian teks, filter status, dan pagination.





9\. VALIDASI DATA PENAWARAN



Data penawaran harus berupa objek JSON dan hanya boleh berisi kolom yang didukung API.



Ketentuan validasi yang diterapkan:



\- penyediaId harus berupa ID positif yang valid.

\- nama harus terdiri dari 3 sampai 120 karakter.

\- kategori harus terdiri dari 1 sampai 40 karakter.

\- hargaNormal harus berupa integer positif.

\- hargaPenawaran tidak boleh melebihi hargaNormal.

\- stok harus berupa integer nol atau lebih.

\- satuan harus terdiri dari 1 sampai 20 karakter.

\- status harus berupa draft, aktif, habis, atau kedaluwarsa.

\- berakhirPada harus menggunakan format tanggal ISO 8601 dengan zona waktu dan harus berada di masa depan.



10\. VALIDASI DATA PESANAN



Data pesanan harus memuat emailPembeli dan items.



Ketentuan validasi yang diterapkan:



\- emailPembeli harus memiliki format email yang valid.

\- items harus berupa array berisi 1 sampai 10 item.

\- setiap item memuat penawaranId dan kuantitas.

\- penawaranId harus berupa ID positif yang valid.

\- kuantitas harus berupa integer antara 1 sampai 1000.

\- ID penawaran tidak boleh berulang dalam satu pesanan.

\- kolom tambahan yang tidak didukung akan ditolak.



11\. FORMAT RESPONS API



Respons daftar penawaran menggunakan objek yang memuat success serta data hasil daftar dan informasi pagination yang dikembalikan repository.



Respons detail penawaran menggunakan format:

success: true

data: objek penawaran



Respons pembuatan penawaran menggunakan HTTP 201 dan menyertakan header Location menuju detail penawaran yang dibuat.



Respons pembaruan penawaran menggunakan HTTP 200.



Respons penghapusan penawaran menggunakan HTTP 204 tanpa isi respons.



12\. CATATAN VALIDASI



Kesalahan validasi menghasilkan HTTP 400 dengan kode VALIDATION\_ERROR. Format lengkap respons kesalahan mengikuti middleware penanganan kesalahan aplikasi.





