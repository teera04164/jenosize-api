const { Game24 } = require("../utils/Game24")

const computeEque24 = (nums) => {
    const game24 = new Game24
    const result = game24.judgePoint24(nums)
    return result ? 'YES' : 'NO'
}


module.exports = {
    computeEque24
}