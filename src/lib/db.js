
// src/lib/db.js
import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error('Tolong definisikan DB_URI di dalam file .env');
}

// Menyimpan koneksi di objek global Node.js agar tidak connect ulang saat Hot-Reload Next.js
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn; // Jika sudah terhubung, langsung kembalikan koneksi yang ada
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}