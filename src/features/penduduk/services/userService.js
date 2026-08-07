import 'server-only';
import * as userRepository from '../repository/userRepository';


export async function getAllUsersService() {
  const rawUsers = await userRepository.findAllUsers();
  
  return rawUsers.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  }));
}

// WRITE: Tambah user baru
export async function createUserService(payload) {
  // Anda bisa tambah logika bisnis di sini (misal: hash password, cek email duplikat, dll)
//   const newUser = await userRepository.insertUser(payload);
  
//   return {
//     ...newUser.toObject(),
//     _id: newUser._id.toString(),
//   };
    return await userRepository.insertUser(payload);
}
