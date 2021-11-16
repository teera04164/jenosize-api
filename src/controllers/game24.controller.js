const { game24Service } = require("../services")

const checkEque24 = async (req, res) => {
    const { n1, n2, n3, n4 } = req.query
    try {
        const result = game24Service.computeEque24([+n1, +n2, +n3, +n4])
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' })
    }
}

module.exports = {
    checkEque24
}