const { searchService } = require("../services")

const searchRestaurant = async (req, res) => {
    const { query } = req.query
    try {
        const result = await searchService.getSearchRestaurant(query)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

const detailRestaurant = async (req, res) => {
    const { place_id } = req.query
    try {
        const result = await searchService.getDetailRestaurant(place_id)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

module.exports = {
    searchRestaurant,
    detailRestaurant,
}