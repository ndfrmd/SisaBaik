import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SisaBaik API berjalan di http://localhost:${PORT}`);
});