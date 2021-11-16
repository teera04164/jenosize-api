class Game24 {
    judgePoint24(nums) {
        let a = [nums[0], nums[1], nums[2], nums[3]];
        return this.helper(a);
    }
    helper(nums) {
        if (nums.length == 1) return Math.abs(nums[0] - 24) < 0.0001;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                let d = Array(nums.length - 1).fill(0);
                for (let k = 0, index = 0; k < nums.length; k++) {
                    if (k != i && k != j) {
                        d[index++] = nums[k];
                    }
                }
                for (const num of this.compute(nums[i], nums[j])) {
                    d[d.length - 1] = num;
                    if (this.helper(d)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    compute(x, y) {
        return [x + y, x - y, y - x, x * y, x / y, y / x];
    }
}

module.exports = {
    Game24,
};
