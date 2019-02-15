import bcrypt from 'bcrypt'

export const users = [{
  id: 'id-1',
  name: 'Admin',
  isAdmin: true,
  email: 'admin@email.com',
  password: bcrypt.hashSync('1234567890', 12),
}, {
  id: 'id-2',
  name: 'User 1',
  isBanned: false,
  email: 'user-1@email.com',
  password: bcrypt.hashSync('1234567890', 12),
}, {
  id: 'id-3',
  name: 'User 2',
  isBanned: false,
  email: 'user-2@email.com',
  password: bcrypt.hashSync('1234567890', 12),
}, {
  id: 'id-4',
  name: 'Admin 2',
  isAdmin: true,
  email: 'admin-2@email.com',
  password: bcrypt.hashSync('1234567890', 12),
}]
