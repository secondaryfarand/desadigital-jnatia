// import mongoose from 'mongoose';

// const DB_URI = process.env.DB_URI;

// if (!DB_URI) {
//   throw new Error('DB_URI belum diatur di Environment Variables Cloudflare!');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   // 🔑 KUNCI 1: Jika sudah connected (readyState === 1), langsung return. Jangan connect ulang!
//   if (cached.conn && mongoose.connection.readyState === 1) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false, // 🔑 KUNCI 2: SANGAT PENTING! Matikan buffering agar Mongoose TIDAK HANG jika socket macet.
//       serverSelectionTimeoutMS: 5000, // Fail-fast setelah 5 detik jika MongoDB tidak merespon
//       socketTimeoutMS: 10000,
//     };

//     cached.promise = mongoose.connect(DB_URI, opts).then((mongooseInstance) => {
//       return mongooseInstance;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null; // Reset promise jika error agar request berikutnya bisa coba lagi
//     throw e;
//   }

//   return cached.conn;
// }








// src/lib/db.js
import mongoose from 'mongoose';

// HAPUS pengecekan DB_URI dari sini (luar fungsi)

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // 1. PINDAHKAN pengecekan variabel ke DALAM fungsi ini
  const DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    throw new Error('Tolong definisikan DB_URI di dalam file .env');
  }

  // 2. Lanjutkan proses koneksi seperti biasa
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Pastikan menggunakan DB_URI di sini
    cached.promise = mongoose.connect(DB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}