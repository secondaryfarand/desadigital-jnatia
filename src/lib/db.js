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