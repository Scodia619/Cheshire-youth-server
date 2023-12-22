const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })

        if (!user) {
            const error = new Error();
            error.code = "Invalid Username"; // Custom error code
            error.status = 400
            error.msg = "Invalid Username"
            throw error; // Throw the custom error
        }else{
            const error = new Error();
            error.code = "Invalid Password"; // Custom error code
            error.status = 400
            error.msg = "Invalid Password"
            throw error; // Throw the custom error
        }
}