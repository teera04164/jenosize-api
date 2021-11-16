const { GoogleAPI } = require("../utils/GoogleAPI")

const getSearchRestaurant = async (query) => {
    const googleApi = new GoogleAPI()
    const result = await googleApi.search(query)
    return result
}

const getDetailRestaurant = async (query) => {
    const googleApi = new GoogleAPI()
    const result = await googleApi.detail(query)
    return result
}

const getPhotoRestaurant = async (query) => {
    const googleApi = new GoogleAPI()
    const result = await googleApi.photo(query)
    return result
}

module.exports = {
    getSearchRestaurant,
    getDetailRestaurant,
    getPhotoRestaurant
}