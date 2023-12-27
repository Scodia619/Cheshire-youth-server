const { loginUser, postUser, deleteUser, getUsers } = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.route('/').delete(deleteUser).get(getUsers)
usersRouter.route('/login').post(loginUser)
usersRouter.route('/create').post(postUser)

module.exports = usersRouter