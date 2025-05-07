//Mencari validasi ISBN
function validateISBN() {
  let isbn = document.getElementById("isbn").value;
  let result = document.getElementById("result");

  if (!/^[0-9]{13}$/.test(isbn)) {
    result.textContent = "Masukkan 13 digit angka untuk validasi.";
    result.style.color = "red";
    return;
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn[i]);
  }
  let checkDigit = (10 - (sum % 10)) % 10;

  if (checkDigit === parseInt(isbn[12])) {
    result.textContent = "✅ ISBN valid!";
    result.style.color = "green";
  } else {
    result.textContent = `❌ ISBN tidak valid. Seharusnya check digit-nya ${checkDigit}`;
    result.style.color = "red";
  }
}
// Mencari digit terakhir
function findCheckDigit() {
  let isbn = document.getElementById("isbn").value;
  let result = document.getElementById("result");

  if (!/^[0-9]{12}$/.test(isbn)) {
    result.textContent =
      "Masukkan tepat 12 digit angka untuk mencari check digit.";
    result.style.color = "red";
    return;
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn[i]);
  }

  let checkDigit = (10 - (sum % 10)) % 10;
  result.innerHTML = `🔢 Check digit untuk ISBN ini adalah <b>${checkDigit}</b>`;
  result.style.color = "blue";
}
//Mencari nilai tengah ISBN
function solveForX() {
  let isbn = document.getElementById("isbn").value;
  let result = document.getElementById("result");

  // Pastikan ISBN hanya terdiri dari 13 karakter dengan satu 'x' di dalamnya.
  if (!/^[0-9xX]{13}$/.test(isbn)) {
    result.textContent =
      "Masukkan 13 digit dengan satu 'x' sebagai angka yang ingin dicari.";
    result.style.color = "red";
    return;
  }

  // Temukan posisi 'x' dalam ISBN.
  let xIndex = isbn.toLowerCase().indexOf("x");
  if (xIndex === -1) {
    result.textContent = "Tidak ditemukan 'x' dalam ISBN.";
    result.style.color = "red";
    return;
  }

  let totalKnown = 0;

  // Hitung total untuk digit yang diketahui, hindari digit yang bukan 'x'.
  for (let i = 0; i < 12; i++) {
    if (i === xIndex) continue;
    let digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      result.textContent = "Karakter selain 'x' harus berupa angka.";
      result.style.color = "red";
      return;
    }
    totalKnown += (i % 2 === 0 ? 1 : 3) * digit;
  }

  // Cari nilai x
  for (let x = 0; x <= 9; x++) {
    // Total perhitungan jika x berada di posisi yang ditentukan
    let total = totalKnown + (xIndex % 2 === 0 ? 1 : 3) * x;
    // Pastikan hasil total modulo 10 adalah 0 (valid ISBN-13)
    if ((total + parseInt(isbn[12])) % 10 === 0) {
      result.innerHTML = `❓ Nilai <b>x</b> yang valid adalah <b>${x}</b>`;
      result.style.color = "blue";
      return;
    }
  }

  // Jika tidak ditemukan nilai yang valid untuk 'x'
  result.textContent = "❌ Tidak ditemukan nilai x yang valid.";
  result.style.color = "red";
}
