const { redisDB } = require("../db/redisDB")
const { GoogleAPI } = require("../utils/GoogleAPI")

const getSearchRestaurant = async (query) => {
    const keyCache = `search-${query.trim()}`
    const inCache = await findInCache(keyCache)
    if (inCache) { return inCache }

    const googleApi = new GoogleAPI()
    const result = await googleApi.search(query)
    if (result?.results) {
        saveInCache(keyCache, result)
    }
    return result
}

const getDetailRestaurant = async (query) => {
    const keyCache = `search-detail-${query.trim()}`
    const inCache = await findInCache(keyCache)
    if (inCache) { return inCache }

    const googleApi = new GoogleAPI()
    const result = await googleApi.detail(query)
    if (result?.result) {
        saveInCache(keyCache, result)
    }
    return result
}

const getPhotoRestaurant = async (query) => {
    const keyCache = `photo-${query}`
    const inCache = await findInCache(keyCache)
    if (inCache) { return inCache }

    const googleApi = new GoogleAPI()
    const result = await googleApi.photo(query)
    if (result?.request?.res?.responseUrl) {
        const urlImage = result.request.res.responseUrl
        saveInCache(keyCache, urlImage)
        return urlImage
    }
    return null
}

const findInCache = async (key) => {
    const cached = await redisDB.get(key)
    if (cached) {
        console.log('in cache');
        return cached
    }
    return null
}

const saveInCache = async (key, data) => {
    redisDB.set(key, data)
}

module.exports = {
    getSearchRestaurant,
    getDetailRestaurant,
    getPhotoRestaurant
}