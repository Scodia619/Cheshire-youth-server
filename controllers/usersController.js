const { PrismaClient } = require("@prisma/client");
const { getUsers } = require("../utils/getUsers");
const passwordHash = require('password-hash')
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
        console.log(passwordHash.generate('1234'))
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