const { loginUser, postUser } = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.route('/login').post(loginUser)
usersRouter.route('/create').post(postUser)

module.exports = usersRouter