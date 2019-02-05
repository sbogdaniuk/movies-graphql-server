const { RESTDataSource } = require('apollo-datasource-rest')

const { config } = require('../config')

export class ShowsAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = config.API
  }

  async getShows () {
    return this.get('shows')
  }

  async getShow (id) {
    return this.get(`shows/${id}`)
  }
}
