const axios = require("axios");
const { redisDB } = require("../db/redisDB");

class GoogleAPI {
  language = "th";
  region = 'th'
  CONFIG = {
    API_KEY: process.env.GOOGLE_API_KEY,
    URL_GOOGLE_API_PLACE: "https://maps.googleapis.com/maps/api/place",
  };
  key = this.CONFIG.API_KEY;

  constructor() {
  }

  getDefaultParams() {
    return {
      key: this.key,
      language: this.language,
      region: this.region
    };
  }

  async search(query) {
    const params = { query, ...this.getDefaultParams() };
    const url = `${this.CONFIG.URL_GOOGLE_API_PLACE}/textsearch/json?${this.getQueryFromJson(params)}`;
    const result = await axios.get(url);
    return result?.data;
  }

  async photo(photo_reference) {
    const params = { photo_reference, ...this.getDefaultParams(), maxwidth: 400 };
    const url = `${this.CONFIG.URL_GOOGLE_API_PLACE}/photo?${this.getQueryFromJson(params)}`;
    const result = await axios.get(url);
    return result
  }

  async detail(place_id) {
    const params = { place_id, ...this.getDefaultParams() };
    const url = `${this.CONFIG.URL_GOOGLE_API_PLACE}/details/json?${this.getQueryFromJson(params)}`;
    const result = await axios.get(url);
    return result?.data;
  }

  getQueryFromJson(params) {
    let query = "";
    for (let key in params) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    return query;
  }
}

module.exports = {
  GoogleAPI
};
