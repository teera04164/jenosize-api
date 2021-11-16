require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/route')

const { redisDB } = require('./src/db/redisDB')

const startServer = async () => {
    app.use(cors())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use('/api', routes)

    const port = process.env.PORT || 5002
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })
}

const downServer = async () => {
    process.exit(0)
}

process.on('SIGTERM', () => {
    downServer()
})

process.on('SIGINT', () => {
    downServer()
})

startServer()
