import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // 🔑 WAJIB: Jangan simpan query di buffer jika koneksi belum ready
      serverSelectionTimeoutMS: 5000, // 🔑 WAJIB: Maksimal tunggu 5 detik saja, langsung throw error jika gagal
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}








// // src/lib/db.js
// import mongoose from 'mongoose';

// // HAPUS pengecekan DB_URI dari sini (luar fungsi)

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   // 1. PINDAHKAN pengecekan variabel ke DALAM fungsi ini
//   const DB_URI = process.env.DB_URI;

//   if (!DB_URI) {
//     throw new Error('Tolong definisikan DB_URI di dalam file .env');
//   }

//   // 2. Lanjutkan proses koneksi seperti biasa
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     // Pastikan menggunakan DB_URI di sini
//     cached.promise = mongoose.connect(DB_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }