import mongoose from 'mongoose';
// import bcrypt from "bcrypt";
import bcrypt from 'bcryptjs'; // Gunakan bcryptjs untuk kompatibilitas serverless

// Membuat Schema versi Atlas
const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username wajib diisi'],
        unique: true, // Agar tidak ada username ganda
        trim: true,

        // tambahan khusus project ini
        // lowercase: true,
        // match: [/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore'],
    },
    email: {
        type: String,
        required: [true, 'Email wajib diisi'],
        unique: true, // Agar satu email hanya bisa satu akun
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password wajib diisi'],
        minlength: [6, 'Password minimal 6 karakter']
         // tambahan khusus project ini
        //  select: false, // 🔒 PENTING: Mencegah password ikut terambil saat query biasa
    }
    }, { 
    timestamps: true // Otomatis membuat field createdAt dan updatedAt
    // collection: 'penduduk' // <--- Paksa nama collection menjadi 'penduduk supaya kalau mau ga plurarin di mongo db (+s)'
    
});


// Middleware: Berjalan otomatis sebelum data disimpan (Save/Create)
// userModel.pre('save', async function() {
//   // Hanya jalankan fungsi ini jika password memang sedang diubah/baru dibuat
//   if (!this.isModified('password')) return;

//   try {
//     // Generate 'salt' (bumbu acak agar hash lebih unik)
//     const salt = await bcrypt.genSalt(10);
//     // Ubah password asli menjadi hash
//     this.password = await bcrypt.hash(this.password, salt);
//     // next();
//   } catch (error) {
//     (error);
//   }
// });
// ✅ BENAR untuk Mongoose Modern (Gunakan async TANPA next)
userModel.pre('save', async function () {
  // Hanya hash password jika password diubah/baru
  if (!this.isModified('password')) return;
  // Cukup gunakan await / throw error secara alami
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userModel.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


// const User = mongoose.model('User', userModel);
const User = mongoose.models.Penduduk || mongoose.model('Penduduk', userModel);

export default User;
// export default {User};