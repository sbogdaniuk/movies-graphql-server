import DataLoader from 'dataloader'
import find from 'lodash/find'
import filter from 'lodash/filter'

import { users } from './data'
import { sleep } from '../utils'

// workaround for REST params like ?id[]=1&id[]=2
const idsPredicate = (ids = []) => d => ids.includes(d.id)

export class UserAPI {
  constructor () {
    this.usersLoader = new DataLoader(async (ids) => {
      const list = await this.getUsersByIds(ids)
      return ids.map(id => list.find((d) => d.id === id))
    })
  }

  async getUsers () {
    await sleep(100)
    return users
  }

  async getUser (fields) {
    await sleep(100)
    return find(users, fields) || null
  }

  async getUsersByIds (ids) {
    await sleep(100)
    console.log(111, 'FETCH getUsersByIds', ids)
    return filter(users, idsPredicate(ids))
  }

  async getUserById (id) {
    await sleep(100)
    console.log(111, 'getUserById', id)
    return this.usersLoader.load(id) || null
  }

  async getUserById__SINGLE_FETCH (id) {
    await sleep(100)
    console.log(111, 'FETCH getUserById', id)
    return find(users, { id }) || null
  }

  async banUser (id) {
    users.find(d => {
      if (d.id === id){
        d.isBanned = true
      }
    })
    return await this.getUserById(id)
  }
}
