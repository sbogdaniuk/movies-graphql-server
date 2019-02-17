import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

import { API } from '../config'

export class UserAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = `${API}/users`

    this.usersLoader = new DataLoader(async (ids) => {
      const list = await this.getUsersByIds(ids)
      return ids.map(id => list.find((d) => d.id === id))
    })
  }

  async getUsers (params) {
    return this.get('/', params)
  }

  async getUser (params) {
    const [user] = await this.get('/', params)
    return user
  }

  async getUsersByIds (ids) {
    return this.get('/', { id: ids })
  }

  async getUserById (id) {
    return await this.usersLoader.load(id) || null
  }

  async banUser (id) {
    return await this.patch(`/${id}`, { isBanned: true })
  }
}
