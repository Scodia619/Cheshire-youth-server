const { PrismaClient } = require("@prisma/client");
const { getUsers } = require("../utils/getUsers");
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

        if(user.password !== password){
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