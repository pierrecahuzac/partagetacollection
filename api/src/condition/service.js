const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const conditionService = {  
  async findAll() {
    try {
        const conditions =  await prisma.condition.findMany({});
        
        return conditions
     
    } catch (error) {
      console.log(error);
    }
  },
  
};
module.exports = conditionService;
