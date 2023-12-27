const missingDetailsError = new Error();
missingDetailsError.status = 400;
missingDetailsError.msg = "Missing Data";

const incorrectDataError = new Error();
incorrectDataError.status = 400;
incorrectDataError.msg = "Incorrect Data Type";

const noUserError = new Error();
noUserError.status = 400;
noUserError.msg = "User doesnt exist";

const noCommissionError = new Error();
noCommissionError.status = 400;
noCommissionError.msg = "Commission doesnt exist";

const commissionExistsError = new Error();
commissionExistsError.status = 400;
commissionExistsError.msg = "Commission already created";

const userLinkedError = new Error();
userLinkedError.status = 400;
userLinkedError.msg = "User already linked with commission";

const userExistsError = new Error();
userExistsError.status = 400;
userExistsError.msg = 'User already exists'

module.exports = {
  missingDetailsError,
  incorrectDataError,
  noUserError,
  noCommissionError,
  commissionExistsError,
  userExistsError,
  userLinkedError,
};
