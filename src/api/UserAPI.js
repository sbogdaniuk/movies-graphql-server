import { users } from './data'

export class UserAPI {
  async getUser (id) {
    return users.find(u => u.id === id)
  }
}
