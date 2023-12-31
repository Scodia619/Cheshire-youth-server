const { PrismaClient } = require("@prisma/client");
const { getAlllUsers } = require("./utils");
const passwordHash = require('password-hash');
const { missingDetailsError, incorrectDataError, noUserError } = require("./errorConstants");
const prisma = new PrismaClient();

exports.loginUser = async (req, res, next) => {
    const {username, password} = req.body
    try{
        const user = await prisma.users.findUnique({
            where: {
                username: username,
            }
        })
    
        if(!user){
            const error = new Error("Invalid Username");
            error.status = 400
            error.msg = 'Invalid Username'
            throw error; // Throw the custom error
        }

        if(!passwordHash.verify(password, user.password)){
            const error = new Error("Invalid Password");
            error.status = 400
            error.msg = 'Invalid Password'
            throw error; // Throw the custom error
        }
        res.status(200).send({user})
    }catch(err){
        next(err)
    }
}

exports.postUser = async (req, res, next) => {
    const {username, password} = req.body
    try{
        const hashedPassword = passwordHash.generate(password);
        const currentUser = await prisma.users.findUnique({
            where: {
                username: username
            }
        })

        if(currentUser){
            const error = new Error();
            error.status = 400
            error.code = 'USER_EXISTS'
            error.msg = 'Username already exists'
            throw error
        }

            const user = await prisma.users.create({
                data: {username, password: hashedPassword}
            })

            res.status(201).send({user})
        
    }catch(err){
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    const {username} = req.body
    try{
        if(!username) throw missingDetailsError
        if(!isNaN(parseInt(username))) throw incorrectDataError

        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })

        if(!user) throw noUserError

        const deletedLinks = await prisma.commissionUser.deleteMany({
            where: {
                    userId: user.user_id
                }
        })
        const deletedUser = await prisma.users.delete({
            where: {
                user_id: user.user_id
            }
        })

        res.sendStatus(204)
    }
    catch(err){next(err)}
}

exports.getUsers = async (req, res, next) => {
    try{
        const users = await prisma.users.findMany({})
        res.status(200).send({users})
    }catch(err){
        next(err)
    }
}