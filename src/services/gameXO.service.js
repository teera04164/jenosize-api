const { GameXO } = require("../utils/GameXO")

const initial = async () => {
    const gameXo = new GameXO()
    const result = await gameXo.initial()
    return result

}
const getDataByGameId = async (game_id) => {
    const gameXo = new GameXO(game_id)
    const result = await gameXo.getData()
    return result
}

const movePosition = async (game_id, position) => {
    const gameXo = new GameXO(game_id)
    const result = await gameXo.movePosition(Number(position))
    console.log("🚀 ~ file: gameXO.service.js ~ line 18 ~ movePosition ~ result", result)
    return result
}

const reset = async (game_id) => {
    const gameXo = new GameXO(game_id)
    const result = gameXo.reset()
    return result
}

module.exports = {
    initial,
    getDataByGameId,
    movePosition,
    reset
}