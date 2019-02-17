import bcrypt from 'bcrypt'
import faker from 'faker'
import times from 'lodash/times'

import { sleep } from '../utils'
import shows from './shows.json'

const usersCount = 10
const passwords = times(usersCount, () => bcrypt.hashSync('1234567890', 12))

const generateUser = (user) => (n) => {
  const { name } = faker
  const firstName = name.firstName()
  const lastName = name.lastName()
  const email = [
    firstName.toLowerCase(),
    '.',
    lastName.toLowerCase(),
    '@email.com',
  ].join('')
  return {
    id: faker.random.uuid(),
    name: [firstName, lastName].join(' '),
    email,
    isAdmin: Math.random() > .8,
    isBanned: Math.random() > .5,
    password: passwords[n],
    ...user,
  }
}

export const genDB = async () => {
  const db = {
    shows,
    users: [{
      id: faker.random.uuid(),
      name: 'Super Admin',
      isAdmin: true,
      email: 'admin@email.com',
      password: bcrypt.hashSync('1234567890', 12),
    }, {
      id: '2',
      name: 'Default User',
      isBanned: false,
      email: 'user@email.com',
      password: bcrypt.hashSync('1234567890', 12),
    },
      ...times(usersCount, generateUser())],
  }

  await sleep(200)

  return db
}
