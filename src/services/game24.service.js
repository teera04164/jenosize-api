const { Game24 } = require("../utils/Game24")

const computeEque24 = (nums) => {
    const game24 = new Game24
    const result = game24.judgePoint24(nums)
    console.log("🚀 ~ file: game24.service.js ~ line 6 ~ computeEque24 ~ result", result)
    return result ? 'YES' : 'NO'
}


module.exports = {
    computeEque24
}