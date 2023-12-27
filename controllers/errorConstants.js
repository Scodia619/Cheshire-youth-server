const missingDetailsError = new Error()
missingDetailsError.status = 400
missingDetailsError.msg = 'Missing Data'

const incorrectDataError = new Error()
incorrectDataError.status = 400
incorrectDataError.msg = 'Incorrect Data Type'

const noUserError = new Error()
noUserError.status = 400
noUserError.msg = 'User doesnt exist'

const noCommissionError = new Error()
noCommissionError.status = 400
noCommissionError.msg = 'Commission doesnt exist'

module.exports = {missingDetailsError, incorrectDataError, noUserError, noCommissionError}