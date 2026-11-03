LAPORAN HASIL PENGUJIAN CHAPTER 7

SISABAIK API

================================



1\. INFORMASI PENGUJIAN



Nama proyek: SisaBaik API

Tanggal pengujian: 26 Oktober 2026

Lingkungan: Lokal

Alamat server: http://127.0.0.1:3000

Database: sisabaik\_dev



Catatan:

Laporan ini mencatat hasil yang telah diamati selama pengujian. Lengkapi bagian yang belum dijalankan dengan hasil aktual sebelum laporan diserahkan.



2\. PEMERIKSAAN KONEKSI DATABASE



Perintah:

npm run db:check



Hasil:

Pemeriksaan koneksi database berhasil. Aplikasi dapat terhubung ke PostgreSQL.



Status: LULUS



3\. PENGUJIAN API



Perintah:

npm run api:test



Hasil yang tercatat:

Skrip pengujian API sebelumnya menyelesaikan pengujian dengan status PASS. Pesan akhirnya menunjukkan bahwa data pesanan dan penawaran tetap tersimpan.



Status: LULUS



Catatan:

Tambahkan tanggal pelaksanaan dan rincian hasil pengujian jika diperlukan.



4\. PENGUJIAN KONKURENSI PESANAN



Perintah:

node .\\scripts\\uji-konkurensi.js



Skenario:

Sebuah penawaran uji dibuat dengan stok awal satu unit. Dua permintaan pembuatan pesanan dikirim secara bersamaan untuk penawaran yang sama.



Hasil aktual:



\- ID penawaran uji: 11

\- Stok awal: 1

\- Status HTTP dua permintaan: 201 dan 409

\- Stok akhir: 0

\- Pesan hasil skrip: PASS



Status: LULUS



Kesimpulan:

Dalam skenario pengujian ini, hanya satu permintaan pesanan yang berhasil. Permintaan kedua menerima HTTP 409. Stok berakhir pada nilai 0, sehingga tidak terjadi penjualan melebihi stok yang tersedia pada pengujian tersebut.



Catatan:

Penawaran uji dipertahankan di database sebagai bukti pengujian.



5\. PENANGANAN KESALAHAN API



Implementasi middleware menangani beberapa kondisi berikut:



\- HTTP 400: kesalahan validasi atau JSON tidak valid.

\- HTTP 409: konflik data atau transaksi.

\- HTTP 413: ukuran payload melebihi 20 KB.

\- HTTP 503: database tidak tersedia.

\- HTTP 500: kesalahan internal server.



Respons error menggunakan properti success bernilai false dan objek error yang memuat code serta message.



6\. KESIMPULAN



Pemeriksaan koneksi database berhasil, pengujian API sebelumnya lulus, dan pengujian konkurensi menunjukkan satu permintaan berhasil serta satu permintaan ditolak karena konflik stok.



Hasil ini mendukung bahwa alur pengelolaan stok bekerja sesuai harapan pada skenario yang telah diuji.



7\. INFORMASI TAMBAHAN



Commit yang diuji: \[isi setelah memeriksa Git]

Nama database: sisabaik\_dev

Kata sandi database: tidak dicantumkan dalam laporan



