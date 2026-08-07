import 'server-only'; // Memastikan file ini tidak bocor ke browser/client
import { connectDB } from '@/lib/db';
import User from '../models/Penduduk';

export async function findAllUsers() {
  await connectDB();
  return await User.find({}).lean();
}

export async function findUserById(id) {
  await connectDB();
  return await User.findById(id).lean();
}

export async function insertUser(userData) {
  await connectDB();
  // Menggunakan new User + save() agar pre('save') bcrypt hook berjalan
  const user = new User(userData);
  await user.save();
  
  const userObject = user.toObject();
  delete userObject.password; // Keamanan ganda: hapus field password dari return value
  return userObject;
}

