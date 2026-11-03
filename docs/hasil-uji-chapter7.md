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

### Catatan hasil pengujian sebelumnya

Laporan pengujian sebelumnya mencatat bahwa skrip API menyelesaikan pengujian dengan status PASS dan data pesanan serta penawaran tetap tersimpan.

Tanggal dan rincian lengkap pelaksanaan pengujian sebelumnya tidak tercatat secara terperinci.

Status: **LULUS (berdasarkan catatan pengujian sebelumnya).**

### Pengujian ulang pada 3 November 2026

Perintah:

```bash
npm run api:test:chapter7
```

Hasil aktual:

- 6 pemeriksaan awal berhasil (PASS).
- Pengujian berhenti pada permintaan POST penawaran.
- Skrip mengharapkan HTTP 400, tetapi server memberikan HTTP 401 (`AUTH_REQUIRED`).

Penyebab: skrip pengujian Chapter 7 masih mengirim permintaan mutasi tanpa token autentikasi, sedangkan endpoint tersebut sekarang memerlukan autentikasi.

Status: **BELUM LULUS — skrip pengujian perlu disesuaikan dengan mekanisme autentikasi dan otorisasi Chapter 8.**

Catatan: Kegagalan skrip ini tidak dengan sendirinya membuktikan bahwa implementasi endpoint API rusak.


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

Pemeriksaan koneksi PostgreSQL berhasil dilakukan. Catatan pengujian sebelumnya menunjukkan pengujian API pernah lulus, sedangkan pengujian konkurensi menunjukkan bahwa satu permintaan pesanan berhasil dan permintaan lainnya ditolak karena konflik stok.

Pada pengujian ulang tanggal 3 November 2026, skrip API Chapter 7 belum berhasil diselesaikan karena belum menyesuaikan kebutuhan token autentikasi pada endpoint yang diuji.

Dengan demikian, hasil pengujian konkurensi tetap dicatat sebagai lulus untuk skenario yang telah dijalankan, sedangkan pengujian ulang API Chapter 7 masih memerlukan penyesuaian skrip.


7\. INFORMASI TAMBAHAN



Commit yang diuji: \[isi setelah memeriksa Git]

Nama database: sisabaik\_dev

Kata sandi database: tidak dicantumkan dalam laporan



