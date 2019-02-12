import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

import { API } from '../config'

export class ShowsAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = API

    this.showLoader = new DataLoader(async (ids) => {
      const shows = await this.getShows({
        ids: ids.join(','),
      })
      return ids.map(id =>
        shows.find((progress) => progress.id === id),
      )
    })
  }

  async getShows (params = {}) {
    return this.get('shows', params)
  }

  async getShow (id) {
    return this.get(`shows/${id}`)

    // If it will be good BE, they will ive you endpoint like so
    // https://jsonplaceholder.typicode.com/posts?id=1&id=2
    // and you will use dataloader instead
    // return this.showLoader.load(id)
  }
}
