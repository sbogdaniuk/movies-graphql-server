import find from 'lodash/find'

import { users } from './data'

export class UserAPI {
  async getUser (fields) {
    return find(users, fields) || null
  }
}
