'use server';

import { CreateUserSchema } from './schema/userSchema';
import { createUserService } from './services/userService';
import { revalidatePath } from 'next/cache';

export async function createUserAction(prevState, formData) {
  console.log('--- [1] SERVER ACTION DIPANGGIL ---');
  
  const rawData = {
    username: String(formData.get('username') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    password: String(formData.get('password') || ''),
  };

  console.log('--- [2] RAW DATA FORM:', rawData);

  // Validasi Zod
  const validated = CreateUserSchema.safeParse(rawData);

  if (!validated.success) {
    console.log('--- [3] ZOD VALIDASI GAGAL:', validated.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Validasi gagal, perhatikan petunjuk di bawah input.',
      errors: validated.error.flatten().fieldErrors,
      inputs: {
        username: rawData.username,
        email: rawData.email,
        password: '',
      },
    };
  }

  console.log('--- [4] ZOD VALIDASI SUKSES, MENCOBA SIMPAN KE DB... ---');

  try {
    const result = await createUserService(validated.data);
    console.log('--- [5] SUKSES TERSIMPAN DI DB:', result);

    revalidatePath('/users');

    return {
      success: true,
      message: 'User berhasil terdaftar!',
      errors: {},
      inputs: { username: '', email: '', password: '' },
    };
  } catch (error) {
    console.error('--- [X] ERROR SAAT SIMPAN KE DB:', error);

    let errorMessage = 'Terjadi kesalahan pada server';
    if (error && typeof error === 'object' && error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      errorMessage = `${field === 'email' ? 'Email' : 'Username'} sudah terdaftar!`;
    }

    return {
      success: false,
      message: errorMessage,
      errors: {},
      inputs: {
        username: rawData.username,
        email: rawData.email,
        password: '',
      },
    };
  }
}

