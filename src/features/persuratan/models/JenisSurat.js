import mongoose from 'mongoose';

const JenisSuratSchema = new mongoose.Schema(
  {
    nama_surat: {
      type: String,
      required: [true, 'Nama surat wajib diisi'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    deskripsi: {
      type: String,
      default: '',
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mencegah OverwriteModelError di Next.js saat Hot Reloading
export default mongoose.models.JenisSurat ||
  mongoose.model('JenisSurat', JenisSuratSchema);