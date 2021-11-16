const { game24Service } = require("../services")
const { GameXO } = require("../utils/GameXO")

const initial = async (req, res) => {
    try {
        const gameXo = new GameXO()
        const result = await gameXo.initial()
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}
const getDataByGameId = async (req, res) => {
    const { game_id } = req.params
    try {
        const gameXo = new GameXO(game_id)
        const result = await gameXo.getData()
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

const clickBox = async (req, res) => {
    const { game_id } = req.params
    const { position } = req.body
    try {
        const gameXo = new GameXO(game_id)
        const result = await gameXo.movePosition(position)
        res.status(200).json(result)
    } catch (error) {
        console.log("🚀 ~ file: gameXO.controller.js ~ line 32 ~ clickBox ~ error", error)
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

const reset = async (req, res) => {
    const { game_id } = req.params
    try {
        const gameXo = new GameXO(game_id)
        const result = await gameXo.reset()
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