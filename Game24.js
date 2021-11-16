const judgePoint24 = function (nums) {
    const isValid = x => Math.abs(x - 24) < 0.0000001
    const aux = (arr = []) => {
        if (arr.length === 1) {
            return isValid(arr[0])
        }
        let valid = false
        for (let indexI = 0; indexI < arr.length; indexI++) {
            for (let indexJ = indexI + 1; indexJ < arr.length; indexJ++) {
                const nextArr = arr.filter((element, index) => index !== indexI && index !== indexJ)
                valid = valid || aux([...nextArr, arr[indexI] + arr[indexJ]])
                    || aux([...nextArr, arr[indexI] - arr[indexJ]])
                    || aux([...nextArr, arr[indexJ] - arr[indexI]])
                    || aux([...nextArr, arr[indexI] * arr[indexJ]])
                    || aux([...nextArr, arr[indexI] / arr[indexJ]])
                    || aux([...nextArr, arr[indexJ] / arr[indexI]])
            }
        }
        return valid
    }

    return aux(nums)
}

let result = judgePoint24([1, 5, 4, 1])
console.log("🚀 ~ file: game24.js ~ line 25 ~ result", result)