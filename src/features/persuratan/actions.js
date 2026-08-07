'use server';

import {
  createPengajuanSuratService,
  getStatusSuratByTiketService,
} from './services/persuratanService';
import { revalidatePath } from 'next/cache';

export async function submitPengajuanSuratAction(prevState, formData) {
  console.log('--- [1] PERSURATAN ACTION DIPANGGIL ---');

  const rawData = {
    jenis_surat_id: String(formData.get('jenis_surat_id') || '').trim(),
    nik_pengirim: String(formData.get('nik_pengirim') || '').trim(),
    nama_pengirim: String(formData.get('nama_pengirim') || '').trim(),
    no_hp_pengirim: String(formData.get('no_hp_pengirim') || '').trim(),
    tempat_lahir: String(formData.get('tempat_lahir') || '').trim(),
    tanggal_lahir: String(formData.get('tanggal_lahir') || '').trim(),
    alamat_pengirim: String(formData.get('alamat_pengirim') || '').trim(),
    keperluan: String(formData.get('keperluan') || '').trim(),
    nama_usaha: String(formData.get('nama_usaha') || '').trim(),
    alamat_usaha: String(formData.get('alamat_usaha') || '').trim(),
  };

  console.log('--- [2] RAW DATA FORM PERSURATAN:', rawData);

  // Validasi Sederhana
  if (!rawData.jenis_surat_id || !rawData.nik_pengirim || !rawData.nama_pengirim) {
    console.log('--- [3] VALIDASI GAGAL: Field utama kosong ---');
    return {
      success: false,
      message: 'Mohon isi semua bidang formulir yang wajib diisi.',
      errors: {},
      inputs: rawData,
    };
  }

  console.log('--- [4] VALIDASI SUKSES, MENCOBA SIMPAN KE DB... ---');

  try {
    const payload = {
      jenis_surat_id: rawData.jenis_surat_id,
      nik_pengirim: rawData.nik_pengirim,
      nama_pengirim: rawData.nama_pengirim,
      no_hp_pengirim: rawData.no_hp_pengirim,
      tempat_lahir: rawData.tempat_lahir,
      tanggal_lahir: rawData.tanggal_lahir,
      alamat_pengirim: rawData.alamat_pengirim,
      keperluan: rawData.keperluan,
      data_tambahan: {
        ...(rawData.nama_usaha && { nama_usaha: rawData.nama_usaha }),
        ...(rawData.alamat_usaha && { alamat_usaha: rawData.alamat_usaha }),
      },
    };

    const result = await createPengajuanSuratService(payload);
    console.log('--- [5] SUKSES TERSIMPAN DI DB:', result);

    revalidatePath('/persuratan');

    return {
      success: true,
      message: 'Pengajuan surat berhasil dibuat!',
      nomor_tiket: result.nomor_tiket,
      errors: {},
      inputs: {
        jenis_surat_id: '',
        nik_pengirim: '',
        nama_pengirim: '',
        no_hp_pengirim: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat_pengirim: '',
        keperluan: '',
        nama_usaha: '',
        alamat_usaha: '',
      },
    };
  } catch (error) {
    console.error('--- [X] ERROR SAAT SIMPAN KE DB:', error);

    return {
      success: false,
      message: 'Terjadi kesalahan pada server saat mengirim pengajuan.',
      errors: {},
      inputs: rawData,
    };
  }
}

export async function lacakSuratAction(nomorTiket) {
  console.log('--- [1] LACAK SURAT ACTION DIPANGGIL ---:', nomorTiket);

  if (!nomorTiket) {
    return {
      success: false,
      message: 'Nomor tiket tidak boleh kosong.',
      data: null,
    };
  }

  try {
    const data = await getStatusSuratByTiketService(nomorTiket.trim().toUpperCase());

    if (!data) {
      return {
        success: false,
        message: 'Nomor tiket tidak ditemukan.',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Data tiket ditemukan.',
      data,
    };
  } catch (error) {
    console.error('--- [X] ERROR SAAT LACAK SURAT:', error);
    return {
      success: false,
      message: 'Gagal mengambil status surat dari server.',
      data: null,
    };
  }
}