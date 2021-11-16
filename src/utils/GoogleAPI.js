const axios = require("axios");

class GoogleAPI {
  language = "th";
  region = 'th'
  CONFIG = {
    API_KEY: "AIzaSyBRZG407l3uDlrEZ5K7KU2nGH2c-LzDySE",
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
    const { API_KEY } = this.CONFIG;
    if (!API_KEY) {
      return [];
    }

    const params = { query, ...this.getDefaultParams() };
    const url = `${this.CONFIG.URL_GOOGLE_API_PLACE}/textsearch/json?${this.getQueryFromJson(params)}`;
    const result = await axios.get(url);
    return result?.data?.results || [];
  }

  async detail(place_id) {
    const { API_KEY } = this.CONFIG;
    if (!API_KEY) {
      return [];
    }

    const params = { place_id, ...this.getDefaultParams() };
    const url = `${this.CONFIG.URL_GOOGLE_API_PLACE}/details/json?${this.getQueryFromJson(params)}`;
    const result = await axios.get(url);
    return result?.data?.result || [];
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
  GoogleAPI,
};
