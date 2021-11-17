const { gameXOService } = require("../services")

const initial = async (req, res) => {
    try {
        const result = await gameXOService.initial()
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}
const getDataByGameId = async (req, res) => {
    const { game_id } = req.params
    try {
        const result = await gameXOService.getDataByGameId(game_id)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

const clickBox = async (req, res) => {
    const { game_id } = req.params
    const { position } = req.body
    try {
        const result = await gameXOService.movePosition(game_id, position)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

const reset = async (req, res) => {
    const { game_id } = req.params
    try {
        const result = await gameXOService.reset(game_id)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

module.exports = {
    initial,
    getDataByGameId,
    clickBox,
    reset
}