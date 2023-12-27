const { loginUser, postUser, deleteUser } = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.route('/').delete(deleteUser)
usersRouter.route('/login').post(loginUser)
usersRouter.route('/create').post(postUser)

module.exports = usersRouter