const express = require('express')

const { searchController, game24Controller, gameXOController } = require('./controllers')
const { searchValidator, detailValidator, game24Validator, gameXOValidator } = require('./middlewares/validator')
const router = express.Router()

router.get('/restaurant/search', searchValidator, searchController.searchRestaurant)
router.get('/restaurant/detail', detailValidator, searchController.detailRestaurant)

router.get('/game24', game24Validator, game24Controller.checkEque24)

router.get('/gameXO/:game_id', gameXOController.getDataByGameId)
router.post('/gameXO', gameXOController.initial)
router.put('/gameXO/:game_id', gameXOValidator, gameXOController.clickBox)
router.delete('/gameXO/:game_id', gameXOController.reset)

module.exports = router
