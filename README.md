# **SISABAIK API**

REST API untuk aplikasi SisaBaik yang mengelola penawaran makanan dan pembuatan pesanan menggunakan Express.js dan PostgreSQL.

1. TEKNOLOGI

   * Node.js versi 22 atau lebih baru
   * Express.js 5
   * PostgreSQL
   * pg untuk koneksi database



2\. PERSYARATAN

Sebelum menjalankan aplikasi, pastikan perangkat telah memiliki:

* Node.js dan npm
* PostgreSQL
* Database pengembangan yang sudah disiapkan sesuai skema proyek



3\. INSTALASI

Langkah-langkah instalasi:

1\.	Buka terminal pada folder proyek sisabaik-api.

2\.	Pasang dependensi dengan perintah:

npm install

3\.	Siapkan file .env berdasarkan file .env.example.

4\.	Sesuaikan konfigurasi koneksi database pada file .env.

5\.	Pastikan PostgreSQL aktif dan database dapat diakses.



CATATAN:

Jangan membagikan kata sandi database atau informasi rahasia lainnya. File .env tidak boleh dimasukkan ke repositori Git.



4\. MENJALANKAN APLIKASI

Untuk menjalankan aplikasi dalam mode pengembangan:

npm run dev

Untuk menjalankan aplikasi tanpa mode pemantauan perubahan file:

npm start

Server menggunakan alamat lokal yang dikonfigurasi pada proyek.



5\. PEMERIKSAAN DATABASE

Untuk memeriksa koneksi database, jalankan:

npm run db:check

Perintah tersebut digunakan untuk memeriksa apakah aplikasi dapat terhubung ke database PostgreSQL.



6\. PENGUJIAN API

Untuk menjalankan pengujian API yang tersedia, gunakan:

npm run api:test

Pengujian konkurensi dapat dijalankan menggunakan:

node .\\scripts\\uji-konkurensi.js

Pastikan server API sedang berjalan sebelum menjalankan pengujian konkurensi.



7\. HASIL PENGUJIAN KONKURENSI

Pengujian dilakukan dengan membuat penawaran yang memiliki stok awal satu unit, kemudian mengirimkan dua permintaan pembuatan pesanan secara bersamaan.

Hasil pengujian:

•	Permintaan pertama berhasil dengan HTTP 201.

•	Permintaan kedua ditolak dengan HTTP 409.

•	Stok akhir menjadi 0.

•	Pengujian menampilkan status PASS.

Hasil ini menunjukkan bahwa pada skenario pengujian tersebut, hanya satu pesanan yang berhasil menggunakan stok terakhir.



8\. CATATAN PENGEMBANGAN

•	Aplikasi menggunakan Express.js untuk menangani permintaan HTTP.

•	PostgreSQL digunakan untuk menyimpan data.

•	Konfigurasi koneksi database disimpan pada file .env.

•	File .env.example digunakan sebagai contoh konfigurasi tanpa informasi rahasia.

•	Pengujian dapat membuat data penawaran dan pesanan baru di database pengembangan.



Dokumentasi ini menjelaskan langkah dasar instalasi, menjalankan aplikasi, pemeriksaan database, dan pengujian API.





