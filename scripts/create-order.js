
import { pool } from "../src/db/pool.js";

const [emailPembeli, idPenawaranArg, kuantitasArg] =
  process.argv.slice(2);

const idPenawaran = Number(idPenawaranArg);
const kuantitas = Number(kuantitasArg);

if (
  !emailPembeli ||
  !Number.isInteger(idPenawaran) ||
  idPenawaran < 1 ||
  !Number.isInteger(kuantitas) ||
  kuantitas < 1
) {
  console.error(
    "Gunakan: npm run db:order -- <email> <id_penawaran> <kuantitas>"
  );
  process.exitCode = 1;
} else {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hasilPenawaran = await client.query(
      `SELECT id, penyedia_id, nama, harga_normal,
              harga_penawaran, stok, status, berakhir_pada
       FROM penawaran
       WHERE id = $1
       FOR UPDATE`,
      [idPenawaran]
    );

    const penawaran = hasilPenawaran.rows[0];

    if (!penawaran) {
      throw new Error("Penawaran tidak ditemukan.");
    }

    if (penawaran.status !== "aktif") {
      throw new Error("Penawaran tidak aktif.");
    }

    if (new Date(penawaran.berakhir_pada) <= new Date()) {
      throw new Error("Masa berlaku penawaran telah berakhir.");
    }

    if (penawaran.stok < kuantitas) {
      throw new Error("Stok penawaran tidak mencukupi.");
    }

    const hasilPembeli = await client.query(
      `SELECT id
       FROM pengguna
       WHERE email = $1 AND peran = $2`,
      [emailPembeli, "pembeli"]
    );

    const pembeli = hasilPembeli.rows[0];

    if (!pembeli) {
      throw new Error(
        "Pembeli tidak ditemukan atau bukan pengguna pembeli."
      );
    }

    const totalTransaksi =
      Number(penawaran.harga_penawaran) * kuantitas;

    
const nilaiStokTerselamatkan =
  (Number(penawaran.harga_normal) -
    Number(penawaran.harga_penawaran)) * kuantitas;

const hasilPesanan = await client.query(
  `INSERT INTO pesanan (
     pembeli_id, penyedia_id, total_transaksi,
     nilai_stok_terselamatkan, status
   )
   VALUES ($1, $2, $3, $4, $5)
   RETURNING id, total_transaksi,
             nilai_stok_terselamatkan, status`,
  [
    pembeli.id,
    penawaran.penyedia_id,
    totalTransaksi,
    nilaiStokTerselamatkan,
    "menunggu-konfirmasi"
  ]
);

const pesanan = hasilPesanan.rows[0];


    await client.query(
      `INSERT INTO detail_pesanan (
         pesanan_id, penawaran_id, penyedia_id, kuantitas,
         harga_normal_satuan, harga_penawaran_satuan
       )
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        pesanan.id,
        penawaran.id,
        penawaran.penyedia_id,
        kuantitas,
        penawaran.harga_normal,
        penawaran.harga_penawaran
      ]
    );

    const hasilStok = await client.query(
      `UPDATE penawaran
       SET stok = stok - $1
       WHERE id = $2
       RETURNING id, nama, stok`,
      [kuantitas, idPenawaran]
    );

    await client.query("COMMIT");

    console.log("Pembeli valid:", pembeli.id);
    console.log("Pesanan berhasil dibuat:", pesanan);
    console.log("Stok setelah pesanan:", hasilStok.rows[0]);
    console.log("Transaksi berhasil disimpan.");
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback gagal:", rollbackError.message);
    }

    console.error("Transaksi gagal:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}
