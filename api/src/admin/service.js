const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const adminService = {
    async findAllUser(req){
        try {
       // const userId = req.user.sub
        const users = await prisma.user.findMany()
        return users
        } catch (error) {
            console.log(error);
            
        }
    }

}

module.exports = adminService;