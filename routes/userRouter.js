const { loginUser } = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.route('/login').post(loginUser)

module.exports = usersRouter