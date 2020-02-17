const axios = require('axios')

class TFT {
  constructor() {
    this._apiUrl = 'https://na1.api.riotgames.com'
    this._apiKey = 'RGAPI-204966d2-e47a-477c-87a7-e4e7a4cf3d5c'
  }

  get(url) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'get',
        url: `${this._apiUrl}${url}`,
        headers: {
          'X-Riot-Token': `${this._apiKey}`
        }
      })
      .then(res => reslove(res.data))
      .catch(error => reject(error))
    })
  }

  getAccountDataByName(name) {
    return this.get(`/tft/summoner/v1/summoners/by-name/${name}`)
  }

  getLeagueBySummonerid(id) {
    return this.get(`/tft/league/v1/entries/by-summoner/${id}`)
  }
}

module.exports = TFT