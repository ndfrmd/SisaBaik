
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const host = new URL(base).hostname;

if (!["127.0.0.1", "localhost"].includes(host)) {
  throw new Error("Jalankan uji hanya pada server lokal latihan.");
}

const tanda = `Uji konkurensi C7 ${Date.now()}`;

async function request(method, path, payload, expectedStatus) {
  const response = await fetch(new URL(path, base), {
    method,
    headers: { "Content-Type": "application/json" },
    body: payload === undefined ? undefined : JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  const body = response.status === 204 ? null : await response.json();

  if (response.status !== expectedStatus) {
    throw new Error(
      `${method} ${path}: diharapkan ${expectedStatus}, ` +
      `mendapat ${response.status}: ${JSON.stringify(body)}`
    );
  }

  return { status: response.status, body };
}

async function main() {
  await request("GET", "/api/health", undefined, 200);

  // Buat penawaran khusus dengan stok tepat satu.
  const penawaran = await request("POST", "/api/penawaran", {
    penyediaId: "1",
    nama: tanda,
    kategori: "roti",
    hargaNormal: 10000,
    hargaPenawaran: 5000,
    stok: 1,
    satuan: "paket",
    status: "aktif",
    berakhirPada: new Date(Date.now() + 86400000).toISOString(),
  }, 201);

  const penawaranId = penawaran.body.data.id;
  console.log(`Penawaran uji dibuat: ${penawaranId}; stok awal 1`);

  const payload = {
    emailPembeli: "siti.pembeli@example.test",
    items: [{ penawaranId, kuantitas: 1 }],
  };

  // Mulai kedua permintaan sebelum menunggu hasil salah satunya.
  
  const hasil = await Promise.all([
    fetch(new URL("/api/pesanan", base), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    }),
    fetch(new URL("/api/pesanan", base), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    }),
  ]);

  const status = hasil.map((response) => response.status);
  console.log("Status dua permintaan:", status);

  assert.deepEqual(
    [...status].sort((a, b) => a - b),
    [201, 409],
    "Harus ada satu HTTP 201 dan satu HTTP 409."
  );

  const cekStok = await request(
    "GET",
    `/api/penawaran/${penawaranId}`,
    undefined,
    200
  );

  console.log("Stok akhir:", cekStok.body.data.stok);
assert.equal(cekStok.body.data.stok, 0, "Stok akhir harus 0.");
  console.log("Penawaran uji dipertahankan sebagai bukti.");


  console.log("PASS: hanya satu pesanan berhasil dan stok menjadi 0.");
}

main().catch((error) => {
  console.error("FAIL:", error.message);
  process.exitCode = 1;
});
